console.log('attached')



var Blog = Backbone.Model.extend({
    defaults:{
        task:'',
        priority:'low',
        added : ''
    }

});
let createobj = (task,priority,added) => {
    return new Blog({
        "task":task,"priority":priority,"added":added
    })
}

var BlogCollection = Backbone.Collection.extend({
    model : Blog
});

var allblogs = new BlogCollection();

let add_to_collection = (obj) =>  allblogs.add(obj);


let ElementView = Backbone.View.extend({
    tagName:"li",
    render : function() {
        this.$el.html(this.model.get('task'));
        return this;
    }
});

let ListView = Backbone.View.extend({
    render:function(){
        this.$el.empty()
        let self = this;
        this.model.each(task => {
            var element = new ElementView({model:task})
            self.$el.append(element.render().$el)
        })
    }

})

let test_collection = new BlogCollection([
    createobj('task1',3,'high'),
    createobj('task2',4,'low'),
    createobj('task3',5,'mid'),
    createobj('task4',36,'high')
])
 let mode_1 = new Blog(createobj('new',1,'high'));
var view = new ListView({el : "#test", model : test_collection});
