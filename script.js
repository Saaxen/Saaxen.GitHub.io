const track = document.getElementById("image-track");

window.onmousedown = e => {
	track.dataset.mouseDownAt = e.clientX;
}

window.onmouseup = () => {
	track.dataset.mouseDownAt = "0";
	track.dataset.prevPercentage = track.dataset.percentage;
}

window.onmousemove = e => {	
	if(track.dataset.mouseDownAt === "0") return;
	
	const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
		maxDelta = window.innerWidth / 2;
	
	percentage = (mouseDelta / maxDelta) * -100,
		test = parseFloat(track.dataset.prevPercentage) + percentage;
	
	if (test > 0) {
		nextPercentage = 0;
	} else if (test < -100) {
		nextPercentage = -100;
	} else {
		nextPercentage = test;
	}
	
	track.dataset.percentage = nextPercentage;	

	track.animate({
		transform: `translate(${nextPercentage}%)`
	}, { duration: 1200, fill: "forwards" });
	
	for(const image of track.getElementsByClassName("image")) {
		image.animate({
			objectPosition: `${100 + nextPercentage}%`
		}, { duration: 1200, fill: "forwards" });
	}
}
