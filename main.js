const { tooltip } = require("./lib/Base");

try {
    require("./env");
} catch (error) {
    tooltip.log("无env.js文件");
}

const { setVariable } = require("./lib/setVariable");
const { start, isMe, checkCookie } = require("./lib/lottery-in-nodejs");
const { clear } = require("./lib/clear");

((async () => {
    const { NUMBER, CLEAR, COOKIE, PAT, LOCALLAUNCH } = process.env;
    if (COOKIE) {
        if (!LOCALLAUNCH && !PAT) {
            tooltip.log('请查看README文件, 填入相应的PAT');
            return;
        }
        await setVariable(COOKIE);
        if (await checkCookie(NUMBER)) {
            switch (process.argv.slice(2)[0]) {
                case 'start':
                    tooltip.log('开始参与抽奖');
                    await start();
                    break;
                case 'check':
                    tooltip.log('检查是否中奖');
                    await isMe();
                    break;
                case 'clear':
                    if (CLEAR) {
                        tooltip.log('开始清理动态');
                        await clear();
                        tooltip.log('清理动态完毕');
                    }
                    break;
                default:
                    break;
            }
        }
    }
    process.exit(0)
}))();
