const Connection = require('../utils/Connection');
const Lottery = require('../utils/Lottery');
const fs = require('fs');


class MLottery {

    constructor() {
        let path = require('path');
        this.lotteryFileName = path.join(__dirname + '/lottery.json')
    }

    getFileData() {
        return JSON.parse(fs.readFileSync(this.lotteryFileName, 'utf8'));
    }

    getInfo(onReady) {
        return onReady(this.getFileData());
    }

    updateFile(newData) {
        fs.writeFile(this.lotteryFileName, JSON.stringify(newData), (err) => {
            if (err) return console.log(err);
        });
    }


    newTry(onReady, req, resp) {

        let lottery = new Lottery();

        lottery.lotteryInfo(this.getFileData());

        const MemberModel = require('./MMember');
        let memberModel = new MemberModel();

        if (memberModel.getClientId(req) != '')
            return onReady({ error: 'The attempt has already been used' });


        return memberModel.newMember((result) => {
            let lottry = lottery.newTry();

            if (!lottry)
                return onReady(result);

            this.updateFile(lottery.getUpdatedInfo());

            return memberModel.updateMember((res) => {
                result['isWinner'] = 1;
                onReady(result);
            }, [result['clientUniqId'], 1]);
        }, resp);
    }
}

module.exports = MLottery;