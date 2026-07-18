// 密钥模板：复制本文件为 config.secret.js 并填入真实密钥。
// config.secret.js 已被 .gitignore 忽略，不会提交到 Git。
//
// 密钥来源：在服务器上运行 backend/deploy.sh 时会自动生成并打印，
// 也可用 `docker exec slique env | grep POSTURE_API_KEY` 查看当前生效的密钥。

module.exports = {
  apiKey: '在这里填入你的密钥',
}
