export class Cursor {
    constructor() {
        // config
        this.target = {
            x: 0.5,
            y: 0.5
        }; // mouse position
        this.cursor_pos = {
            x: 0.5,
            y: 0.5
        }; // cursor position
        this.speed = 0.2;
        this.lerp = (a, b, n) => (1 - n) * a + n * b;
        this.hovers = Array.from(document.getElementsByClassName("hover_cursor")); // Convertir en tableau
        this.cursor = document.getElementById("cursor")
        this.init();
    }
    bindAll() {
        ["onMouseMove", "render", "click"].forEach((fn) => (this[fn] = this[fn].bind(this)));
    }
    click(){
        console.log("e");
    }
    onMouseMove(e) {
        //get normalized mouse coordinates [0, 1]
        this.target.x = e.clientX / window.innerWidth;
        this.target.y = e.clientY / window.innerHeight;

        // add hover effect
        for (const hover of this.hovers) {
            var hover_x = hover.getBoundingClientRect().x
            var hover_width = hover.getBoundingClientRect().width
            var hover_y = hover.getBoundingClientRect().y
            var hover_height = hover.getBoundingClientRect().height
        
            if (e.clientX >= hover_x && e.clientX <= (hover_width + hover_x) && e.clientY >= hover_y && e.clientY <= (hover_height + hover_y)) {
                this.cursor.classList.add("hover");
                break;
            } else {
                if (this.cursor.classList.contains("hover")) {
                    this.cursor.classList.remove("hover");
                }
            }
        }             

        // trigger loop if no loop is active
        if (!this.raf) this.raf = requestAnimationFrame(this.render);
    }
    render() {
        //calculate lerped values
        this.cursor_pos.x = this.lerp(this.cursor_pos.x, this.target.x, this.speed);
        this.cursor_pos.y = this.lerp(this.cursor_pos.y, this.target.y, this.speed);
        document.documentElement.style.setProperty("--cursor-x", this.cursor_pos.x);
        document.documentElement.style.setProperty("--cursor-y", this.cursor_pos.y);
        //cancel loop if mouse stops moving
        const delta = Math.sqrt(
            Math.pow(this.target.x - this.cursor_pos.x, 2) +
            Math.pow(this.target.y - this.cursor_pos.y, 2)
        );
        if (delta < 0.001) {
            cancelAnimationFrame(this.raf);
            this.raf = null;
            return;
        }
        //or continue looping if mouse is moving
        this.raf = requestAnimationFrame(this.render);
    }
    init() {
        this.bindAll();
        window.addEventListener("mousemove", this.onMouseMove);
        window.addEventListener("click", this.click)
        this.raf = requestAnimationFrame(this.render);
    }
}


export function show_nav(nav, btn_nav) {
    btn_nav.addEventListener("click", (e) => {
        if(nav.classList.contains("visible")) {
            document.documentElement.style.overflowY = "visible";
            nav.classList.remove("visible")

            gsap.to(nav, {
                top:1000,
                opacity:0,
                duration:.5
            })
            /* gsap.to(".navigation_btn", {
                x:'-100vw',
                opacity:0,
                duration:1,
            })
            gsap.to(nav, {
                delay:1,
                top:1000,
                opacity:0,
                duration:.5,
            }) */
        }
        else {
            document.documentElement.style.overflowY = "hidden";
            nav.classList.add("visible")
            gsap.to(nav, {
                top:0,
                opacity:1,
                duration:.5
            })
/* 
            gsap.to(nav, {
                top:0,
                opacity:1,
                duration:.5,
            })
            gsap.to(".navigation_btn", {
                x:0,
                opacity:1,
                duration:1,
                delay:0.5
            }) */
        }
    })
}

export function load(){
    window.addEventListener("load", () => {
        var main_video = document.getElementById("main_video")
        gsap.to(".char", {
            y:0,
            stagger:.15,
            delay:.2,
            duration:.1,
            onComplete: function (){
                gsap.to("#loading_bar", {
                    width:'100%',
                    duration:1,
                    onComplete: function (){
                        gsap.to(loader, {
                            opacity:0,
                            delay:.2,
                            duration:1,
                            display: "none"
                        })
                    }
                })
            }
        })
        main_video.play()
    })
}