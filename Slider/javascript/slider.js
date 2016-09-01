// JavaScript Document

function Slider(id, autosliding) {
	this.slider = document.getElementById(id);
	this.view = this.slider.getElementsByClassName('view')[0];
	this.pages = this.view.getElementsByClassName('page');
	this.arrows = this.slider.getElementsByClassName('arrow');
	this.indicator = this.slider.getElementsByClassName('indicator')[0];
	this.buttons = this.indicator.getElementsByTagName('li');
	this.width = this.slider.offsetWidth;
	this.height = this.slider.offsetHeight;
	this.interval = 2500;
	this.index = 0;
	this.oldIndex = 0;
	this.leftward = false;
	this.timer=null;
	this.over = false;
	
	var the = this;
		
	this.start = function() {
		this.view.style.width = this.width * this.pages.length + 'px';
		this.view.style.height = this.height + 'px';
		
		for (var i=0; i<this.pages.length; i++) {
			this.pages[i].style.width = this.width + 'px';
			this.pages[i].style.height = this.height + 'px';
		}		
		
		this.indicator.style.marginLeft = -19 * this.buttons.length / 2	+ 'px';
		for (var i=0; i<this.buttons.length; i++) {
			this.buttons[i].index = i;
			this.buttons[i].onclick = this.select;
		}		
		this.buttons[this.index].className = 'current';
		
		this.arrows[1].onclick = function() {
			if (the.index < the.pages.length-1) {
				the.leftward = false;
				the.next();
			}
		}
		
		this.arrows[0].onclick = function() {
			if (the.index > 0) {
				the.leftward = true;
				the.next();
			}
		}
		
		this.slider.onmouseover = function() {
			the.over = true;

			the.stopAutoSlide();
		}
		
		this.slider.onmouseout = function() {
			the.over = false;
			
			the.startAutoSlide();
		}
		
		this.startAutoSlide();
	}
	
	this.next = function() {
		if (the.leftward) {
			if (--the.index == 0)
				the.leftward = false;
		} else {
			if (++the.index == the.pages.length-1)
				the.leftward = true;
		}
		
		the.indicate(the.index);
		the.view.style.left = -the.index * the.width + 'px';
		
		if (the.over == false) {
			the.startAutoSlide();
		}
	}
	
	this.select = function() {
		if (the.index == this.index) 
			return;
			
		the.index = this.index;
		the.view.style.left = -the.index * the.width + 'px';
			
		if (the.index == 0) {
			the.leftward = false;
		} else if(the.index == the.pages.length-1) {
			the.leftward = true;
		}
			
		the.indicate(the.index);
	}
	
	this.indicate = function(newIndex) {
		the.buttons[the.oldIndex].className = '';
		the.buttons[newIndex].className = 'current';
		the.oldIndex = newIndex;
	}

	this.startAutoSlide = function() {
		if (autosliding) {
			the.timer = setTimeout(the.next, the.interval);
		}
	}
	
	this.stopAutoSlide = function() {
		if (the.timer != null) {
			clearTimeout(the.timer);
			the.timer = null;
		}	
	}
	
	this.start();
}

