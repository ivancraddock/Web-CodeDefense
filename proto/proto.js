var IMAGE_COUNT  = 5;           // number of image files
var IMAGE_SIZE   = 25;          // size of image in pixels (NOTE part of filename)
var UPDATE_HERTZ = 20;          // update+draw this many times per second
var BALL_SPEED   = 5;           // speed of balls

$(document).ready(function() {
    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    var width = $("#canvas").width();
    var height = $("#canvas").height();

    var balls = [];             // list of ball objects (position, speed, image)
    var images = [];            // list of ball images


    function init() {
        log("Initializing...\n");
        $("#compile").click(compile);
        load_images();
        compile();
        setInterval(tick, 1000/UPDATE_HERTZ);
    }


    function tick() {
        if(!images_loaded()) return;
        update();
        draw();
    }


    function load_images() {
        images = [];
        var loaded = 0;
        for(var i=0; i<IMAGE_COUNT; i++) {
            img = new Image();
            img.src = "assets/" + IMAGE_SIZE + "_ball0" + (i+1) + ".png";
            images[i] = img;
        }
    }


    function images_loaded() {
        for(i=0; i<images.length; i++) {
            if(!images[i].complete) {
                return false;
            }
        }
        return true;
    }


    function compile() {
        var count;
        log("Compiling...\n");
        count = ball_count();
        log("Found " + count + " balls.\n");
        randomize_balls(count);
    }


    function update() {
        for(i=0; i<balls.length; i++) {
            var ball = balls[i];
            /* check for wall collision */
            if(ball.y <= 0) {                        // top wall
                ball.dy *= -1;
            }
            else if(ball.y + IMAGE_SIZE >= height) { // bottom wall
                ball.dy *= -1;
            }
            else if(ball.x <= 0) {                   // left wall
                ball.dx *= -1;
            }
            else if(ball.x + IMAGE_SIZE >= width) {  // right wall
                ball.dx *= -1;
            }
            /* check for ball collisions */
            for(j=0; j<balls.length; j++) {
                if(j == i) continue;
                do_collision(ball, balls[j]);
            }
            /* apply force */
            ball.x += ball.dx * BALL_SPEED;
            ball.y += ball.dy * BALL_SPEED;
        }
    }


    function do_collision(b1, b2) {
        var is = IMAGE_SIZE;
        // horizontal collision
        if(b1.x <= b2.x && b2.x <= (b1.x+is) ||
           b2.x <= b1.x && b1.x <= (b2.x+is)) {
            // vertical collision
            if(b1.y <= b2.y && b2.y <= (b1.y+is) ||
               b2.y <= b1.y && b1.y <= (b2.y+is)) {
                // FIXME simple collision: just swap vectors
                tmp = b1.dx;
                b1.dx = b2.dx;
                b2.dx = tmp;
                tmp = b1.dy;
                b1.dy = b2.dy;
                b2.dy = tmp;
            }
        }
    }


    function draw() {
        var img;

        /* clear canvas */
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, width, height);
        ctx.strokeStyle = "black";
        ctx.strokeRect(0, 0, width, height);

        /* draw balls */
        for(var i=0; i<balls.length; i++) {
            var ball = balls[i];
            ctx.drawImage(ball.img, ball.x, ball.y);
        }
    }


    function randint(a, b) {
        return Math.floor(randfloat(a, b));
    }


    function randfloat(a, b) {
        return (Math.random() * (b-a)) + a;
    }


    function randomize_balls(count) {
        // remove balls
        while(balls.length > count) {
            balls.pop();
        }
        // add balls
        while(balls.length < count) {
            balls.push({
                img: images[randint(0, IMAGE_COUNT)], // image file
                x:   randint(1, width - IMAGE_SIZE),  // x position
                y:   randint(1, height - IMAGE_SIZE), // y position
                dx:  randfloat(-1, 1),                // x speed
                dy:  randfloat(-1, 1),                // y speed
            });
        }
    }


    function ball_count() {
        // ball count is simply the string count of "new RandomBall()"
        var text = $("#edit").val();
        return (text.match(/new RandomBall()/g)||[]).length;
    }


    function log(msg) {
        $("#output").append(msg);
    }


    /* call init() on page load */
    init();
});
