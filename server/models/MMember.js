const Connection = require('../utils/Connection');


class MMember extends Connection {
    constructor() {
        super('Users');
    }


    findMembersById(onReady, memberId = null) {
        return this.select(
            this.prop(
                '*',
                (memberId !== null ? '`clientUniqId`=? OR `clientID`=?' : ''),
                [memberId, memberId]
            ),
            (res) => {
                if (res && memberId !== null && typeof res['0'] !== 'undefined')
                    res = res['0'];
                onReady(res);
            }
        );
    }

    findWinners(onReady, winnersOnly) {
        return this.select(
            this.prop(
                '*',
                '`isWinner`=?',
                [(winnersOnly === true ? 1 : 0)]
            ),
            onReady
        );
    }


    newMember(onReady, resp) {
        const memberUtils = require('../utils/MemberUtils');

        return this.insert(
            this.props({ clientUniqId: memberUtils.createUniqId() }),
            (res) => {
                this.findMembersById(
                    (res2) => {
                        this.sendNewMember(resp, res2['clientUniqId']);
                        onReady(res2);
                    },
                    res.insertId
                )
            }
        );
    }

    updateMember(onReady, params) {
        let memberId = params[0];
        let isWinner = params[1];

        return this.update(
            this.props(
                {
                    isWinner: isWinner,
                },
                '',
                ('`clientUniqId`=? OR `clientID`=?'),
                [memberId, memberId]
            ),
            (res) => {
                onReady({
                    'length': res.affectedRows
                });
            }
        );
    }


    removeMembers(onReady, memberId) {
        return this.remove(
            this.prop(
                {
                    isWinner: isWinner,
                },
                '',
                (memberId === true ? '1' : '`clientUniqId`=? OR `clientID`=?'),
                [memberId, memberId]
            ),
            (res) => {
                onReady({
                    'length': res.affectedRows
                });
            }
        );
    }


    getClientId(req) {
        if (typeof req.cookies.clientId === 'undefined')
            return '';

        return req.cookies.clientId;
    }

    sendNewMember(res, clientId) {
        res.cookies
        res.cookie('clientId', clientId, { maxAge: 900000, httpOnly: false });
    }
}


module.exports = MMember;