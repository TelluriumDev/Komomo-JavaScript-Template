let listener = EventBus.emplaceListener("PlayerJoinEvent", (player) => {
    player.sendMessage("欢迎加入服务器！")
    return true
})

EventBus.removeListener(listener)

// Logger

let logger = Logger.getLogger("Test Logger")

// Form 
// 此处可以不用导出
export function newCustomForm(player) {
    let form = Form.newCustomForm("Test Form")
    form.setTitle("测试表单")
    form.appendLabel("这是一个测试表单")
    form.appendInput("控件标识符1", "控件标题", "输入提示", "默认值")
    form.appendToggle("控件标识符2", "控件标题", true)
    form.appendSlider("控件标识符3", "控件标题", 0, 100, 50)
    form.appendStepSlider("控件标识符4", "控件标题", ["选项1", "选项2", "选项3"], 2)
    form.appendDropdown("控件标识符5", "控件标题", ["选项1", "选项2", "选项3"], 2)
    form.sendTo(player, (_pl, result) => {
        if (typeof result !== "object") return
        logger.info("控件标识符1: " + result["控件标识符1"])
        logger.info("控件标识符2: " + result["控件标识符2"])
        logger.info("控件标识符3: " + result["控件标识符3"])
        logger.info("控件标识符4: " + result["控件标识符4"])
        logger.info("控件标识符5: " + result["控件标识符5"])
    })
}
listener = EventBus.emplaceListener("PlayerJoinEvent", (player) => {
    player.sendMessage("欢迎加入服务器！")
    newCustomForm(player)
    return true
})