// 在生产环境或 CI 环境中跳过 Husky 的安装
// 校验忽略
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'production' || process.env.CI === 'true') {
    // eslint-disable-next-line no-undef
    process.exit(0)
}
// const husky = (await import('husky')).default
// console.log(husky())
