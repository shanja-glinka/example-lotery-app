const dateValidators = require('./DateValidator');

class Lottery {
    constructor() {
        this.max = 2;
        this.min = 1;

        this.winPostion = 1;

        this.lottery = {};
    }

    lotteryInfo(lottery) {
        this.lottery = lottery;

        if (this.lottery == null || this.lottery == {}) {
            const dateValidators = require('./DateValidator');

            const dateNow = new Date();
            const dateEnd = new Date();

            dateEnd.setDate(dateEnd.getDate() + 1 * 7);

            this.lottery = {
                "started": dateValidators.getDateStr(dateNow),
                "end": dateValidators.getDateStr(dateEnd),
                "lastWinnerDate": "-1",
                "winners": 0
            }
        }


    }


    getRand() {
        return Math.floor(Math.random() * (this.max - this.min + 1) + this.min)
    }

    getUpdatedInfo() {
        return this.lottery;
    }



    newTry() {

        let winners = this.lottery.winners;
        let lotEndTime = new Date(this.lottery.end);
        let lasWinnerTime = (this.lottery.lastWinnerDate == '-1' ? 0 : new Date(this.lottery.lastWinnerDate))


        let dateNow = new Date();
        let dateNexDay = new Date(dateValidators.getDateStr(dateNow));

        dateNexDay.setDate(dateNexDay.getDate() + 1);


        this.min = 0;
        this.max = Math.floor((dateNexDay.getTime() - dateNow.getTime()) / 1000);
        this.winPostion = this.getRand();

        let rand = this.getRand();

        console.log({
            min: this.min,
            max: this.max,
            pos: this.winPostion,
            range: this.max - this.min,
            win: rand == this.winPostion
        });

        if (winners > 6 || (lasWinnerTime != 0 && dateNow.getDate() == lasWinnerTime.getDate()) || dateNow.getTime() > lotEndTime.getTime())
            return false;

        if (rand == this.winPostion) {
            console.log('winner', rand);

            this.lottery.lastWinnerDate = dateValidators.getDateTimeStr(dateNow);
            this.lottery.winners = winners + 1;

            return true;
        }

        return false;
    }

}

module.exports = Lottery;