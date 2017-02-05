"use strict"

if (!HRDrawModule)
    var HRDrawModule = {};
//Extension de HRDrawModule avec 	 :	

//Interface 2DShapeRenderer -------------------------------------------------------------------------------------------------
//Constructeur
HRDrawModule.HRRotationRenderer = function () {
}

//Rendu spécifique Shape
HRDrawModule.HRRotationRenderer.prototype.render = function(dc, shape, projectionMatrix){
	if(dc && shape && projectionMatrix)
	{
		dc.fillStyle = new HRDrawModule.HRConst().ROTATION_HANDLE_COLOR;
		var handleWidth = new HRDrawModule.HRConst().D2_HANDLE_ZONE_WIDTH;
		if (shape.__rotationPoint) {
			var centerHrPoint = shape.getCentroid();
			var clonedRotationPoint = shape.__rotationPoint.clone();
			clonedRotationPoint.transform(projectionMatrix);
			dc.beginPath();
			dc.moveTo(centerHrPoint.getX(), centerHrPoint.getY());
			dc.lineTo(clonedRotationPoint.getX(), clonedRotationPoint.getY());
			dc.strokeStyle = new HRDrawModule.HRConst().ROTATION_STROKE_STYLE;
			dc.setLineDash([5, 8]);
			dc.stroke();
			dc.fillRect(clonedRotationPoint.getX() - handleWidth, clonedRotationPoint.getY() - handleWidth, 2*handleWidth, 2*handleWidth);
		}
	}
};


