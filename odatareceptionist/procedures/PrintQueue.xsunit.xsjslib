describe("Print Queue Tests", function() {    var cut = $.import("com.sap.sapmentors.sitreg.odatareceptionist.procedures", "PrintQueue");    var participant;    var ParticipantID;    var EventID;        beforeOnce(function() {        var select = 'SELECT TOP 1 "ID", "Participant"."EventID" '        + 'FROM "com.sap.sapmentors.sitreg.data::SITreg.Participant" AS "Participant" '        + 'LEFT JOIN "com.sap.sapmentors.sitreg.data::SITreg.Device" AS "Device" '        + 'ON "Device"."EventID" = "Participant"."EventID" ';        var pStmt = jasmine.dbConnection.prepareStatement(select);        var rs = pStmt.executeQuery();        if (rs.next()) {            ParticipantID = rs.getInteger(1);            EventID = rs.getInteger(1);        }        pStmt.close();           });        it('should read participant details', function() {        participant = cut.readParticipant(ParticipantID);        expect(participant.ParticipantID).toBe(ParticipantID);            });        it('should fill print queue', function() {        participant.PrintStatus = 'P';        var status = cut.addParticipantToPrintQueue(participant);        expect(status.error).toBe(undefined);        expect(status.count).toBe(0);    });    it('check if participant was inserted', function() {        var count = cut.isParticipantInPrintQueue(ParticipantID);        expect(count).toBe(1);    });        afterOnce(function() {                var select = 'DELETE FROM "com.sap.sapmentors.sitreg.data::SITreg.PrintQueue" '    	    + 'WHERE "ParticipantID" = ?';        var pStmt = jasmine.dbConnection.prepareStatement(select);        pStmt.setInteger(1, participant.ParticipantID);        pStmt.execute();        jasmine.dbConnection.commit();         pStmt.close();            });});