export class ClassOutline {
    building: string;
    course: string;
    crn: number;
    days: string;
    instemail: string;
    instructor: string;
    room: string;
    time: string;
    title: string;

    constructor(outline: ClassOutline){
        this.building = outline.building;
        this.course = outline.course;
        this.crn = outline.crn;
        this.days = outline.days;
        this.instemail = outline.instemail;
        this.instructor = outline.instructor;
        this.room = outline.room;
        this.time = outline.time;
        this.title = outline.title;
    }
}