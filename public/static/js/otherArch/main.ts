#class Animal

class Animal {
    constructor( public name )
    { }
    move(meters)
    {
        alert(this.name + " moved " + meters + "m.")
    }
}

#Class and extend
class Snake extends Animal {
    move()
    {
        alert("Slithering...")
        super.move(5)
    }
}