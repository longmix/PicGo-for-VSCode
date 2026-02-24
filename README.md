# PicGo-for-VSCode

## Overview

An extension for the VSCode IDE enables users to upload images to remote hosts, such as Aliyun OSS, Tencent Cloud COS, Qiuniu Image Host, Github, s.ee (sm.ms), imgurl, etc., while editing a Markdown file.

VSCode IDE的扩展使用户能够将图像上传到远程主机，如阿里云OSS，腾讯云COS，秋牛镜像主机，Github等。ms)， imgurl等，同时编辑Markdown文件。

Based on PicGo-Core, `PicGo-for-VSCode` supports 8 kinds of image hosting services: [weibo](https://picgo.github.io/PicGo-Doc/zh/guide/config.html#%E5%BE%AE%E5%8D%9A%E5%9B%BE%E5%BA%8A), [qiniu](https://picgo.github.io/PicGo-Doc/zh/guide/config.html#%E4%B8%83%E7%89%9B%E5%9B%BE%E5%BA%8A), [tcyun](https://picgo.github.io/PicGo-Doc/zh/guide/config.html#%E8%85%BE%E8%AE%AF%E4%BA%91cos), [upyun](https://picgo.github.io/PicGo-Doc/zh/guide/config.html#%E5%8F%88%E6%8B%8D%E4%BA%91), [github](https://picgo.github.io/PicGo-Doc/zh/guide/config.html#github%E5%9B%BE%E5%BA%8A), [aliyun](https://picgo.github.io/PicGo-Doc/zh/guide/config.html#%E9%98%BF%E9%87%8C%E4%BA%91oss), [imgur](https://picgo.github.io/PicGo-Doc/zh/guide/config.html#imgur%E5%9B%BE%E5%BA%8A) and [SM.MS](https://sm.ms/), which are supported by [PicGo-Core](https://github.com/PicGo/PicGo-Core). And the plugin feature of PicGo-Core is working in progress.

## How to setting

**English Version**

1. Open VSCode extensions.
2. Search for `PicGo-for-VSCode` in the search box and install it.
3. Set the image hosting service you want to use in the extension settings.
4. Set the other settings you want to use.
5. Enjoy it.

**Chinese Version**

1. 打开VSCode扩展。
2. 在搜索框中搜索“PicGo-for-VSCode”并安装它。
3. 在扩展设置中设置要使用的图像托管服务。
4. 设置要使用的其他设置。
5. Enjoy it.

## How to use

**English Version**

- Paste an image from clipboard:
  1. Copy an image from file explorer or image viewer;
  2. Press **Ctrl+Alt+U** in the Markdown file;
  3. Wait a moment, the image link will be automatically filled at the cursor position.
- Choose an image from explorer:
  1. In the Markdown file, press **Ctrl+Alt+O**;
  2. In the file explorer, select the image you want to upload and insert;
  3. Wait a moment, the image link will be automatically filled at the cursor position.
- Input image path:
  1. In the Markdown file, press **Ctrl+Alt+O**;
  2. In the popup box, input the image path;
  3. Wait a moment, the image link will be automatically filled at the cursor position.


**Chinese Version**

- 复制粘贴图片：
  1. 从资源管理器或者图片查看软件中复制图片；
  2. 在Markdown文件中同时按 **Ctrl+Alt+U**；
  3. 稍等片刻，图片链接自动填充在光标位置。
- 通过文件管理器中选图片：
  1. 在Markdown文件中同时按 **Ctrl+Alt+O**；
  2. 在文件管理器中选择要上传并插入的图片；
  3. 稍等片刻，图片链接自动填充在光标位置。
- 输入图片路径：
  1. 在Markdown文件中同时按 **Ctrl+Alt+O**；
  2. 在弹出框中输入图片路径；
  3. 稍等片刻，图片链接自动填充在光标位置。

## Keyboard shortcuts

**You can change all the shortcuts below as you wish.**

| OS           | Uploading an image from clipboard               | Uploading images from explorer                  | Uploading an image from input box               |
| ------------ | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| Windows/Unix | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>U</kbd> | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>E</kbd> | <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>O</kbd> |
| MacOS          | <kbd>Cmd</kbd> + <kbd>Opt</kbd> + <kbd>U</kbd>  | <kbd>Cmd</kbd> + <kbd>Opt</kbd> + <kbd>E</kbd>  | <kbd>Cmd</kbd> + <kbd>Opt</kbd> + <kbd>O</kbd>  |

## Settings

- Default
  - The default image hosting is [S.EE](https://s.ee/).

- Custom
- Users can customize the settings in VSCode settings.

## Thanks

- [PicGo-Core](https://github.com/PicGo/PicGo-Core)
- [vs-picgo](https://github.com/PicGo/vs-picgo)
- [vscode-picgo-paste](https://github.com/zcyisiee/vscode-picgo-paste)

**Enjoy!**
