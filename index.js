

(function () {

    var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

    // Main
    initHeader();
    initAnimation();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {x: width/2, y: height/2};

        holder = document.getElementById('holder-bg');
        holder.style.height = height+'px';

        canvas = document.getElementById('bg-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create points
        points = [];
        for(var x = 0; x < width; x = x + width/20) {
            for(var y = 0; y < height; y = y + height/20) {
                var px = x + Math.random()*width/20;
                var py = y + Math.random()*height/20;
                var p = {x: px, originX: px, y: py, originY: py };
                points.push(p);
            }
        }

        // for each point find the 5 closest points
        for(var i = 0; i < points.length; i++) {
            var closest = [];
            var p1 = points[i];
            for(var j = 0; j < points.length; j++) {
                var p2 = points[j]
                if(!(p1 == p2)) {
                    var placed = false;
                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(closest[k] == undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }

                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }

        // assign a circle to each point
        for(var i in points) {
            var c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)');
            points[i].circle = c;
        }
    }

    // Event handling
    function addListeners() {
        if(!('ontouchstart' in window)) {
            window.addEventListener('mousemove', mouseMove);
        }
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function mouseMove(e) {
        var posx = posy = 0;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY)    {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        target.x = posx;
        target.y = posy;
    }

    function scrollCheck() {
        if(document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        holder.style.height = height+'px';
        canvas.width = width;
        canvas.height = height;
    }

    // animation
    function initAnimation() {
        animate();
        for(var i in points) {
            shiftPoint(points[i]);
        }
    }

    function animate() {
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);
            for(var i in points) {
                // detect points in range
                if(Math.abs(getDistance(target, points[i])) < 10000) {
                    points[i].active = 0.3;
                    points[i].circle.active = 0.6;
                } else if(Math.abs(getDistance(target, points[i])) < 60000) {
                    points[i].active = 0.1;
                    points[i].circle.active = 0.3;
                } else{
                    points[i].active = 0.02;
                    points[i].circle.active = 0.1;
                }

                drawLines(points[i]);
                points[i].circle.draw();
            }
        }
        requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
        TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*100,
            y: p.originY-50+Math.random()*100, ease:Circ.easeInOut,
            onComplete: function() {
                shiftPoint(p);
            }});
    }

    // Canvas manipulation
    function drawLines(p) {
        if(!p.active) return;
        for(var i in p.closest) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.closest[i].x, p.closest[i].y);
            ctx.strokeStyle = 'rgba(126,44,158,'+ p.active+')';
            ctx.stroke();
        }
    }

    function Circle(pos,rad,color) {
        var _this = this;

        // constructor
        (function() {
            _this.pos = pos || null;
            _this.radius = rad || null;
            _this.color = color || null;
        })();

        this.draw = function() {
            if(!_this.active) return;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(30,8,224,'+ _this.active+')';
            ctx.fill();
        };
    }

    // Util
    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }
    
})();

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

var currentActiveIndicator = document.getElementById("active-tab-indicator");
document.addEventListener('scroll',setHeader);

function setHeader(){
    var obj = document.querySelector('.header-main-container');
    if (window.scrollY + window.innerHeight * .8 >= window.innerHeight) {
            obj.style.boxShadow = "0 .3rem .3rem rgba(0,0,0,.3)";
            obj.style.background = "rgba(255,255,255,1)";
      }
      if(window.scrollY + window.innerHeight * .8 < window.innerHeight){
              obj.style.boxShadow = "0 .3rem .3rem rgba(0,0,0,0)";
              obj.style.background = "rgba(255,255,255,0)";
    }
}

const about_me = document.getElementById("about-me-trigger");
var elementPosition_about_me = about_me.getBoundingClientRect().top;
var offsetPosition_about_me = elementPosition_about_me + window.pageYOffset;


const my_skills = document.getElementById("my-skills-trigger");
var elementPosition_my_skills= my_skills.getBoundingClientRect().top;
var offsetPosition_my_skills = elementPosition_my_skills + window.pageYOffset;

const portfolio = document.getElementById("portfolio-trigger");
var elementPosition_portfolio = portfolio.getBoundingClientRect().top;
var offsetPosition_portfolio = elementPosition_portfolio + window.pageYOffset;

const contact_me = document.getElementById("contact-trigger");
var elementPosition_contact_me = contact_me.getBoundingClientRect().top;
var offsetPosition_contact_me = elementPosition_contact_me + window.pageYOffset;


document.addEventListener('scroll', () => {
    console.log(offsetPosition_about_me,offsetPosition_my_skills,offsetPosition_portfolio,offsetPosition_contact_me);
    if (window.scrollY + (window.innerWidth*0.33) < offsetPosition_about_me){
        currentActiveIndicator.removeAttribute("id");
        clicker = document.querySelector('[data-indentifier="home-button"]');
        clicker.firstElementChild.setAttribute("id","active-tab-indicator");
        currentActiveIndicator = clicker.firstElementChild;
        document.title = "Home | Deniz Lopes Günes";
    }
    else if (window.scrollY + (window.innerWidth*0.08) + (about_me.clientHeight * 0.25) >= offsetPosition_about_me && window.scrollY + (window.innerWidth*0.08) + (my_skills.clientHeight * 0.25) < offsetPosition_my_skills){
        currentActiveIndicator.removeAttribute("id");
        clicker = document.querySelector('[data-indentifier="about-button"]');
        clicker.firstElementChild.setAttribute("id","active-tab-indicator");
        currentActiveIndicator = clicker.firstElementChild;
        document.title = "About Me | Deniz Lopes Günes";
    }
    else if (window.scrollY + (window.innerWidth*0.08) + (my_skills.clientHeight * 0.25) >= offsetPosition_my_skills && window.scrollY + (window.innerWidth*0.08) + (portfolio.clientHeight * 0.25) < offsetPosition_portfolio){
        currentActiveIndicator.removeAttribute("id");
        clicker = document.querySelector('[data-indentifier="skills-button"]');
        clicker.firstElementChild.setAttribute("id","active-tab-indicator");
        currentActiveIndicator = clicker.firstElementChild;
        document.title = "My Skills | Deniz Lopes Günes";
    }
    else if (window.scrollY+ (window.innerWidth*0.08) + (portfolio.clientHeight * 0.25) >= offsetPosition_portfolio && window.scrollY + (window.innerWidth*0.08) + (contact_me.clientHeight * 0.25)< offsetPosition_contact_me){
        currentActiveIndicator.removeAttribute("id");
        clicker = document.querySelector('[data-indentifier="portfolio-button"]');
        clicker.firstElementChild.setAttribute("id","active-tab-indicator");
        currentActiveIndicator = clicker.firstElementChild;
        document.title = "Portfolio | Deniz Lopes Günes";
    }
    else if (window.scrollY + (window.innerWidth*0.08) + (contact_me.clientHeight * 0.25)>= offsetPosition_contact_me){
        currentActiveIndicator.removeAttribute("id");
        clicker = document.querySelector('[data-indentifier="contact-button"]');
        clicker.firstElementChild.setAttribute("id","active-tab-indicator");
        currentActiveIndicator = clicker.firstElementChild;
        document.title = "Contact Me | Deniz Lopes Günes";
    }
  })


function clickNavbarIndicator(clicker,stri,title) {
    currentActiveIndicator.removeAttribute("id");
    clicker.firstElementChild.setAttribute("id","active-tab-indicator");
    currentActiveIndicator = clicker.firstElementChild;
    const element = document.getElementById(stri);
    var headerOffset = (window.innerHeight * 0.08) -1;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    document.title = title;
    window.scrollTo({
          top: offsetPosition,
          behavior: "smooth" 
    });
}

function clickHome(){
    currentActiveIndicator.removeAttribute("id");
    clicker = document.querySelector('[data-indentifier="home-button"]');
    clicker.firstElementChild.setAttribute("id","active-tab-indicator");
    currentActiveIndicator = clicker.firstElementChild;
    document.title = "Home | Deniz Lopes Günes";
    window.scrollTo(0, 0);
}


