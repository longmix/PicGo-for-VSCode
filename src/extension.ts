import * as vscode from 'vscode';

import {PicGo} from 'picgo';
import { ConfigManager } from './ConfigManager';
import { config } from 'process';

/**
 * 获取配置
 */
function getExtensionConfig() {
    //const config = vscode.workspace.getConfiguration('markdown-image-paste');

    const config = ConfigManager.getConfig();

    console.log('Loaded configuration:', config);

    return config;
}

/**
 * 在编辑器中插入 Markdown 图片链接
 */
async function insertMarkdownImage(editor: vscode.TextEditor, imageUrl: string, fileName: string = '') {
    // 获取当前选区
    const selection = editor.selection;

    var altText = fileName;

    // 如果没有文件名，尝试使用选中文本作为 alt 文本
    if (!altText || altText.trim() === '') {        
        const selectedText = editor.document.getText(selection);
    
        altText = selectedText || 'image';
    }
    
    const markdownImage = `![${altText}](${imageUrl})`;

    await editor.edit((editBuilder) => {
        if (selection.isEmpty) {
            editBuilder.insert(selection.active, markdownImage);
        } else {
            editBuilder.replace(selection, markdownImage);
        }
    });
}

// 定义上传结果接口，便于类型检查和代码提示
interface UploadResult {
    imgUrl: string;
    fileName: string;
    width?: number;
    height?: number;
    size?: number;
    mimeType?: string;
}

// 这是一个更通用的上传函数，可以根据传入的 imagePath 来决定是上传剪贴板图片还是指定路径的图片
// async 函数的函数用Promise<UploadResult | null> 来明确返回值类型，方便调用者处理结果
async function uploadImageByPicgo(editor: vscode.TextEditor, imagePath: string="") : Promise<UploadResult | null> {
    try {

        // 初始化PicGo实例
        const picgo = new PicGo();

        // 设置项
        const extension_config = getExtensionConfig();
        console.log('Manual upload command triggered with extension config:', extension_config);

        // 接口说明： https://docs.picgo.app/core/api/#setconfig-config
        const current_config_name = 'picBed.' + extension_config.picgoCurrent;

        //picgo.removeConfig('picBed', 'current');
        //picgo.removeConfig('picBed', extension_config.picgoCurrent);
        //picgo.removeConfig('picBed', 'uploader');

        var configToSet: any = {
            'picBed.uploader': extension_config.picgoCurrent,
            'picBed.current': extension_config.picgoCurrent,
            [current_config_name]: extension_config.current_config
        };

        // 如果设置了代理服务器，添加到配置中
        if (extension_config.picogoProxy && (extension_config.picogoProxy.trim() !== '')) {
            configToSet['picBed.proxy'] = extension_config.picogoProxy;
        }

        picgo.setConfig(configToSet);

        /*picgo.saveConfig({
            'picBed.uploader': extension_config.picgoCurrent,
            'picBed.current': extension_config.picgoCurrent,
            [current_config_name]: extension_config.current_config
        });*/

        console.log('PicGo configuration set successfully:', {
            'picBed.current': picgo.getConfig('picBed.current'),
            [current_config_name]: picgo.getConfig(current_config_name)
        });

        //return null;


        // 设置PicGo输入（要上传的文件）
        //picgo.input = [imagePath];
        // 执行上传
        //await picgo.upload();
        // 输出上传结果
        //console.log('上传成功：', picgo.output);

        // 直接从返回值获取结果
        var result001 = null;
        
        if (imagePath && (imagePath.trim() !== '')) {
            console.log('正在上传图片：', imagePath);
            result001 = await picgo.upload([imagePath]);
        }
        else {
            // 不传入文件路径，picgo自动读取剪切板
            console.log('正在上传剪切板图片...');
            result001 = await picgo.upload();
        }

        console.log('上传完成，返回结果：', result001);

        // 解析上传结果
        const parsedResult = parseUploadResult(result001);
        if (!parsedResult) {
            vscode.window.showErrorMessage('Failed to parse upload result');
            return null;
        }
        else if (!parsedResult.imgUrl || parsedResult.imgUrl.trim() === '') {
            vscode.window.showErrorMessage(`Failure to get image URL for ${parsedResult.fileName}`);
            return null;
        }

        console.log('解析后的上传结果：', parsedResult);

        // 构建 Markdown 图片链接
        //const markdownImage = `![${parsedResult.fileName}](${parsedResult.imgUrl})`;
        //console.log('Markdown 图片链接：', markdownImage);
        
        if (editor) {
            await insertMarkdownImage(editor, parsedResult.imgUrl, parsedResult.fileName);
            vscode.window.showInformationMessage('Image uploaded successfully!');
        }

        return parsedResult;

    } catch (error) {
        console.error('PicGo上传失败:', error);
        return null;
    }
}


// 解析 PicGo 上传结果的函数，提取图片 URL、文件名、尺寸等信息\
// 这不是 async 函数，因为它只是处理已经获取到的结果，不涉及异步操作
function parseUploadResult(result: any) : UploadResult | null {
    if (!result || result.length === 0) {
        console.error('上传结果为空');
        return null;
    }

    const imgUrl = result[0].imgUrl;
    console.log('图片URL：', imgUrl);
    const fileName = result[0].fileName;
    console.log('文件名：', fileName);
    const width = result[0].width;
    const height = result[0].height;
    console.log(`图片尺寸：${width}x${height}`);

    const size = result[0].size;
    console.log(`图片大小：${size}字节`);
    const mimeType = result[0].mimeType;
    console.log('图片MIME类型：', mimeType);

    return {
        imgUrl,
        fileName,
        width,
        height,
        size,
        mimeType
    };
}




/**
 * DocumentPasteEditProvider - 实现粘贴时自动上传
 * 这是 VSCode 1.82+ 的官方 API，可以拦截粘贴操作
 */
class PicgoPasteEditProvider implements vscode.DocumentPasteEditProvider {
    
    private static readonly kind = vscode.DocumentDropOrPasteEditKind.Empty.append('picgo-upload-paste', 'markdown-image-paste');

    async provideDocumentPasteEdits(
        document: vscode.TextDocument,
        ranges: readonly vscode.Range[],
        dataTransfer: vscode.DataTransfer,
        context: vscode.DocumentPasteEditContext,
        token: vscode.CancellationToken
    ): Promise<vscode.DocumentPasteEdit[] | undefined> {
        
        // 读取配置项，确认是否开启自动上传来自Ctrl+V的图片功能
        const config = getExtensionConfig();

        console.log('DocumentPasteEditProvider triggered with config:', config);
        
        if (!config.autoUploadOnPaste) {
            console.log('Auto upload on paste is disabled in settings');
            return undefined;
        }

        // 检查是否有图片
        let hasImage = false;
        for (const [mimeType] of dataTransfer) {
            if (mimeType.startsWith('image/')) {
                hasImage = true;
                break;
            }
        }

        if (!hasImage) {
            return undefined;
        }

        // 检查是否已取消
        if (token.isCancellationRequested) {
            return undefined;
        }

        
        const uploadResult = await uploadImageByPicgo(null!, '');
        if (!uploadResult || !uploadResult.imgUrl) {
            vscode.window.showErrorMessage('Failed to upload image with PicGo. Please check your PicGo configuration.');
            return undefined;
        }

        // 创建 Markdown 图片链接
        const markdownImage = `![${uploadResult.fileName}](${uploadResult.imgUrl})`;
        
        // 创建粘贴编辑（新 API 需要 3 个参数：insertText, title, kind）
        const pasteEdit = new vscode.DocumentPasteEdit(
            markdownImage,
            'Upload to Remote Server and Paste as Markdown Image',
            PicgoPasteEditProvider.kind
        );
        
        vscode.window.showInformationMessage('Image uploaded successfully!');
        
        return [pasteEdit];
    }
}


/**
 * 扩展激活时调用
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('PicGo Paste extension is now active!');

    // 注册手动上传命令 (Cmd+Alt+U)
    const uploadCommand = vscode.commands.registerCommand(
        'picgo-paste.uploadFromClipboard',
        async () => {

            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showErrorMessage('No active text editor found');
                return;
            } else if (editor.document.languageId !== 'markdown') {
                vscode.window.showErrorMessage('This command is only available in Markdown files');
                return;
            } else {
                uploadImageByPicgo(editor);
            }
            
        }
    );
    context.subscriptions.push(uploadCommand);

    // 注册从文件选择器上传命令 (Cmd+Alt+E)
    const uploadFromFinderCommand = vscode.commands.registerCommand(
        'picgo-paste.uploadFromFinder',
        async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showErrorMessage('No active text editor found');
                return;
            } else if (editor.document.languageId !== 'markdown') {
                vscode.window.showErrorMessage('This command is only available in Markdown files');
                return;
            } else {
                const options: vscode.OpenDialogOptions = {
                    canSelectMany: false,
                    openLabel: 'Upload with PicGo',
                    filters: {
                        'Images': ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp']
                    }
                };
                const fileUris = await vscode.window.showOpenDialog(options);
                if (fileUris && fileUris.length > 0) {
                    const filePath = fileUris[0].fsPath;
                    console.log('Selected file from finder or explorer:', filePath);

                    console.log('正在上传图片：', filePath);

                    await uploadImageByPicgo(editor, filePath);

                }
            }

        }
    );
    context.subscriptions.push(uploadFromFinderCommand);

    // 注册从输入路径上传命令 (Cmd+Alt+O)
    const uploadFromInputCommand = vscode.commands.registerCommand(
        'picgo-paste.uploadFromInput',
        async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showErrorMessage('No active text editor found');
                return;
            } else if (editor.document.languageId !== 'markdown') {
                vscode.window.showErrorMessage('This command is only available in Markdown files');
                return;
            } else {
                const filePath = await vscode.window.showInputBox({
                    prompt: 'Enter the path of the image to upload',
                    placeHolder: '/path/to/your/image.png'
                });
                if (filePath) {
                    console.log('Selected file from input string:', filePath);

                    await uploadImageByPicgo(editor, filePath);
                }
            }
        }
    );
    context.subscriptions.push(uploadFromInputCommand);


    // 注册 DocumentPasteEditProvider
    // 这是 VSCode 官方的粘贴拦截 API，当粘贴图片时会自动触发
    const selector: vscode.DocumentSelector = { language: 'markdown' };
    
    const pasteProvider = vscode.languages.registerDocumentPasteEditProvider(
        selector,
        new PicgoPasteEditProvider(),
        {
            providedPasteEditKinds: [
                vscode.DocumentDropOrPasteEditKind.Empty.append('picgo-upload-paste', 'markdown-image-paste')
            ],
            pasteMimeTypes: ['image/*', 'image/png', 'image/jpeg', 'image/gif', 'image/webp']
        }
    );
    context.subscriptions.push(pasteProvider);

    console.log('PicGo Paste: DocumentPasteEditProvider registered for Markdown files');
}

/**
 * 扩展停用时调用
 */
export function deactivate() {}
