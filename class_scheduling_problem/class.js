function Class(subjectId, teacherId, groupId, roomId, day, time){
    this.subjectId = subjectId;
    this.teacherId = teacherId;
    this.groupId = groupId;
    this.roomId = roomId;
    this.day = day;
    this.time = time;
}

module.exports = {
    Class: Class
};