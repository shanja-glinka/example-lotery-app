const Responce = require('../utils/Responce');

const MemberModel = require('../models/MMember');


exports.showClientId = (req, res, next) => {
    const responce = new Responce(res);

    let memberModel = new MemberModel();
    
    return responce.send(memberModel.getClientId(req));
}


exports.getClients = (req, res, next) => {
    const responce = new Responce(res);

    let memberId = null;

    if (req.params && typeof req.params.client !== 'undefined')
        memberId = req.params.client;

    let memberModel = new MemberModel();

    return memberModel.findMembersById((result) => {
        responce.send(result);
    }, memberId);
}


exports.setClientId = (req, res, next) => {
    const responce = new Responce(res);

    let memberModel = new MemberModel();

    return memberModel.newMember((result) => {
        if (!result)
            return responce.error('Client not found', 404);

        responce.send(result);
    }, req);
}


exports.updateClient = (req, res, next) => {
    const responce = new Responce(res);

    let memberModel = new MemberModel();

    return memberModel.updateMember((result, err) => {
        if (err && err.error)
            responce.error(err.error);

        if (!result.length)
            return responce.error('Client not found', 404);

        responce.send(result);
    }, [req.params.client, 1]);
}


exports.getWinners = (req, res, next) => {
    const responce = new Responce(res);

    let memberModel = new MemberModel();

    return memberModel.findWinners((result) => {
        responce.send(result);
    }, true);
}