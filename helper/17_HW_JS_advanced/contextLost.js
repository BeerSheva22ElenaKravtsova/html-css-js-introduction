let group = {
    title: "Java 2022",
    students: ["Olga", "Anastasia", "Sophia"],
    showList: function () {
        const show = function (name) {
            console.log(`${this.title}: name`);
        }//.bind(this)
        this.students.forEach(show, this);//можно передать контекст или show.bind(this)
    }

    // showList: function () {
    //     const show = (name)=> {//контент подставлен в момент создания объекта
    //         console.log(`${this.title}: name`);
    //     }
    //     this.students.forEach(show);
    // }
}

group.showList();
const newGroup = group;
console.log(newGroup);
group = null;
console.log("=====================");
newGroup.showList();
