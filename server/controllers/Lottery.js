const Lotery = require('../utils/Lottery');
const Responce = require('../utils/Responce');

const LoteryModel = require('../models/MLottery');



exports.about = (req, res, next) => {
    const responce = new Responce(res);

    let loteryModel = new LoteryModel();

    return loteryModel.getInfo((res) => {
        responce.send(res);
    }, true);

}


exports.getWinners = (req, res, next) => {
    const responce = new Responce(res);

    let MemberModel = require('../models/MMember');
    let memberModel = new MemberModel();

    memberModel.findWinners((res) => {
        responce.send(res);
    });
}


exports.newTry = (req, res, next) => {
    const responce = new Responce(res);

    let loteryModel = new LoteryModel();

    return loteryModel.newTry((res) => {
        responce.send(res);
    }, req, res);
}


exports.justTry = (req, res, next) => {
    const responce = new Responce(res);

    const Lottery = require('../utils/Lottery');

    let loteryModel = new LoteryModel();
    let lottery = new Lottery();

    lottery.lotteryInfo(loteryModel.getFileData());

    let lottry = lottery.newTry();

    if (lottry)
        loteryModel.updateFile(lottery.getUpdatedInfo());

    responce.send({
        ...lottery.getUpdatedInfo(),
        'winn': lottry
    })
}