const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// 二维码内容：微信号
const wechatId = 'YuleTech2024';

// 输出路径
const outputPath = path.join(__dirname, '../public/images/wechat-qr.png');

// 确保目录存在
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// 生成二维码配置
const options = {
  width: 400,
  height: 400,
  margin: 2,
  color: {
    dark: '#000000',
    light: '#FFFFFF'
  },
  type: 'png'
};

// 生成二维码
QRCode.toFile(outputPath, wechatId, options, (err) => {
  if (err) {
    console.error('生成二维码失败:', err);
    process.exit(1);
  }
  console.log(`二维码已生成: ${outputPath}`);
  console.log(`内容: ${wechatId}`);
  console.log(`尺寸: 400x400px`);
});
