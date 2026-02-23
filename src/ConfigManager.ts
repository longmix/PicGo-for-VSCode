import * as vscode from 'vscode';

interface IPicGoConfig {
    picgoUploader: string;
    picgoCurrent: string;
    autoUploadOnPaste: boolean;
}

export class ConfigManager {
    private static readonly CONFIG_NAMESPACE = 'markdown-image-paste';
    
    // 定义配置键，便于维护
    private static readonly CONFIG_KEYS = {
        PICGO_UPLOADER: 'picBed.uploader',
        PICGO_CURRENT: 'picBed.current',
        AUTO_UPLOAD_ON_PASTE: 'autoUploadOnPaste'
    };
    
    static getConfig(): any {
        const config = vscode.workspace.getConfiguration(this.CONFIG_NAMESPACE);
        
        var picgoConfig :any = {            
            picgoUploader: config.get<string>(this.CONFIG_KEYS.PICGO_UPLOADER, ''),
            picgoCurrent: config.get<string>(this.CONFIG_KEYS.PICGO_CURRENT, ''),
            autoUploadOnPaste: config.get<boolean>(this.CONFIG_KEYS.AUTO_UPLOAD_ON_PASTE, true),
            // 代理服务器
            picogoProxy: config.get<string>('picBed.proxy', '')
        };

        if (picgoConfig.picgoCurrent == 'aliyun') {
            //picgoConfig.picgoUploader = 'AliYun';

            picgoConfig.current_config = {
                accessKeyId: config.get<string>('picBed.aliyun.accessKeyId', ''),
                accessKeySecret: config.get<string>('picBed.aliyun.accessKeySecret', ''),
                bucket: config.get<string>('picBed.aliyun.bucket', ''),
                area: config.get<string>('picBed.aliyun.area', ''),
                path: config.get<string>('picBed.aliyun.path', ''),
                customUrl: config.get<string>('picBed.aliyun.customUrl', ''),
            };
        }
        else if (picgoConfig.picgoCurrent == 'smms') {
            //picgoConfig.picgoUploader = 'SM.MS';
            picgoConfig.current_config = {
                token: config.get<string>('picBed.smms.token', ''),
                backupDomain: config.get<string>('picBed.smms.backupDomain', 's.ee'),
            };
        }
        else if (picgoConfig.picgoCurrent == 'github') {
            //picgoConfig.picgoUploader = 'Qiniu';
            picgoConfig.current_config = {
                repo: config.get<string>('picBed.github.repo', ''),
                token: config.get<string>('picBed.github.token', ''),
                path: config.get<string>('picBed.github.path', ''),
                customUrl: config.get<string>('picBed.github.customUrl', ''),
                branch: config.get<string>('picBed.qiniu.branch', ''),
            };
        }
        else if (picgoConfig.picgoCurrent == 'imgur') {
            //picgoConfig.picgoUploader = 'Imgur';
            picgoConfig.current_config = {
                clientId: config.get<string>('picBed.imgur.clientId', ''),
                proxy: config.get<string>('picBed.imgur.proxy', ''),
            };
        }
        else if (picgoConfig.picgoCurrent == 'qiniu') {
            //picgoConfig.picgoUploader = 'Qiniu';
            picgoConfig.current_config = {
                accessKey: config.get<string>('picBed.qiniu.accessKey', ''),
                secretKey: config.get<string>('picBed.qiniu.secretKey', ''),
                bucket: config.get<string>('picBed.qiniu.bucket', ''),
                url: config.get<string>('picBed.qiniu.url', ''),
                area: config.get<string>('picBed.qiniu.area', ''),
                options: config.get<string>('picBed.qiniu.options', ''),
                path: config.get<string>('picBed.qiniu.path', ''),
            };
        }
        else if (picgoConfig.picgoCurrent == 'tcyun') {
            //picgoConfig.picgoUploader = 'Tencent Cloud';
            picgoConfig.current_config = {
                version: config.get<string>('picBed.tcyun.v', ''),
                secretId: config.get<string>('picBed.tcyun.secretId', ''),
                secretKey: config.get<string>('picBed.tcyun.secretKey', ''),
                bucket: config.get<string>('picBed.tcyun.bucket', ''),
                appId: config.get<string>('picBed.tcyun.appId', ''),
                area: config.get<string>('picBed.tcyun.area', ''),
                path: config.get<string>('picBed.tcyun.path', ''),
                customUrl: config.get<string>('picBed.tcyun.customUrl', ''),
            };
        }
        else if (picgoConfig.picgoCurrent == 'upyun') {
            //picgoConfig.picgoUploader = 'UpYun';
            picgoConfig.current_config = {  
                bucket: config.get<string>('picBed.upyun.bucket', ''),
                operator: config.get<string>('picBed.upyun.operator', ''),
                password: config.get<string>('picBed.upyun.password', ''),
                url: config.get<string>('picBed.upyun.url', ''),
                folder: config.get<string>('picBed.upyun.folder', ''),
            };
        }
        else if (picgoConfig.picgoCurrent == 'weibo') {
            //picgoConfig.picgoUploader = 'Weibo';
            picgoConfig.current_config = {
                chooseCookie: config.get<string>('picBed.weibo.chooseCookie', ''),
                username: config.get<string>('picBed.weibo.username', ''),
                quality: config.get<string>('picBed.weibo.quality', ''),
                cookie: config.get<string>('picBed.weibo.cookie', ''),
            };
        }

        return picgoConfig;
    }
    

    static getAllConfigValues(): Record<string, any> {
        const config = vscode.workspace.getConfiguration(this.CONFIG_NAMESPACE);
        const result: Record<string, any> = {};
        
        // 遍历所有已知配置键
        Object.values(this.CONFIG_KEYS).forEach(key => {
            result[key] = config.get(key);
        });
        
        return result;
    }
    
    static getConfigDetail(key: string): any {
        const config = vscode.workspace.getConfiguration(this.CONFIG_NAMESPACE);
        return config.inspect(key);
    }
}

// 使用方式
//const config = ConfigManager.getConfig();
//const allConfigValues = ConfigManager.getAllConfigValues();