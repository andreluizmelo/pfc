function Class(subjectId, teacherId, groupId, day, time){
    this.subjectId = subjectId;
    this.teacherId = teacherId;
    this.groupId = groupId;
    this.day = day;
    this.time = time;
}

module.exports = {
    Class: Class
};