# PicGo-for-VSCode

## Overview

An extension for the VSCode IDE enables users to upload images to remote hosts, such as Aliyun OSS, Tencent Cloud COS, Qiuniu Image Host, Github, s.ee (sm.ms), imgurl, etc., while editing a Markdown file.


Based on PicGo-Core, `PicGo-for-VSCode` supports 8 kinds of image hosting services: [weibo](https://picgo.github.io/PicGo-Doc/zh/guide/config.html#%E5%BE%AE%E5%8D%9A%E5%9B%BE%E5%BA%8A), [qiniu](https://picgo.github.io/PicGo-Doc/zh/guide/config.html#%E4%B8%83%E7%89%9B%E5%9B%BE%E5%BA%8A), [tcyun](https://picgo.github.io/PicGo-Doc/zh/guide/config.html#%E8%85%BE%E8%AE%AF%E4%BA%91cos), [upyun](https://picgo.github.io/PicGo-Doc/zh/guide/config.html#%E5%8F%88%E6%8B%8D%E4%BA%91), [github](https://picgo.github.io/PicGo-Doc/zh/guide/config.html#github%E5%9B%BE%E5%BA%8A), [aliyun](https://picgo.github.io/PicGo-Doc/zh/guide/config.html#%E9%98%BF%E9%87%8C%E4%BA%91oss), [imgur](https://picgo.github.io/PicGo-Doc/zh/guide/config.html#imgur%E5%9B%BE%E5%BA%8A) and [SM.MS](https://sm.ms/), which are supported by [PicGo-Core](https://github.com/PicGo/PicGo-Core). And the plugin feature of PicGo-Core is working in progress.

## Features

<details>
<summary>Uploading an image from clipboard</summary>
<img src="https://i.loli.net/2019/04/09/5cac17d2d2265.gif" alt="clipboard.gif">
</details>

<details>
<summary>Uploading images from explorer</summary>
<img src="https://i.loli.net/2019/04/09/5cac17eea0d65.gif" alt="explorer.gif">
</details>

<details>
<summary>Uploading images from input box</summary>
<img src="https://i.loli.net/2019/04/09/5cac17fe52a86.gif" alt="input box.gif">
</details>

<details>
<summary>Use selection text as the uploaded <code>fileName</code></summary>
<img src="https://i.loli.net/2019/04/09/5cac180fb1dc7.gif" alt="selection.gif">
<b>Notice: These characters: <code>\$</code>, <code>:</code>, <code>/</code>, <code>?</code> and newline will be ignored in the image name. </b>(Because they are invalid for file names.)
</details>

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
