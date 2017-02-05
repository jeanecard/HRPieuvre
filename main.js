//------------------------------------------   TEST ----------------------------------------------------------------//
//Amelioration : inversifyjs pour notamment éviter aux documents d'instancier le layer ///
//Mettre les event listener dans les bons objets : Le selector
//Passer par des interfaces plutôt que par des instances.
//Faire de l'ioc / Injection de dépendance sur ce main qui sait faire trop de chose
//Casser les dépendances trop fortes entre Vues / Vue / Document / Controller
//Introduire la notion d'accesseur ECMA5 avec les attributs configurable à minima et conserver les GetPropertyRef pour un accès direct 
//aux propriétés.



//Création d'un document avec un Layer :
var hRdocument = new HRDrawModule.HRDocument();
hRdocument.createNewLayer();
//On s'assure que le context est suffisant pour se lancer :
if(hRdocument.getLayersRef() && hRdocument.getLayersRef()[0])
{
	//On référence une bonne fois pour toute le premier et unique Layer du document 
	var layer = hRdocument.getLayersRef()[0];
	layer.getShapesRef().push(new HRDrawModule.HRRectangle()); //Essai 1
	// layer.Shapes.push(new HRDrawModule.HRRectangle()); //Essai 2

	var polyline = new HRDrawModule.HRPolyLine();
	polyline.addPoint(new HRDrawModule.HRPoint(10, 10, 0));
	polyline.addPoint(new HRDrawModule.HRPoint(100, 200, 0));
	polyline.addPoint(new HRDrawModule.HRPoint(100, 400, 0));
	polyline.addPoint(new HRDrawModule.HRPoint(400, 300, 0));
	layer.getShapesRef().push(polyline);

	// //Translation via matrice (sur x)
	layer.getShapesRef()[0].setHandles(0, new HRDrawModule.HRPoint(500, 200, 1));
	layer.getShapesRef()[0].setHandles(2, new HRDrawModule.HRPoint(600, 400, 1));

	//mise en place temporaire de la rotation sur Shape 0
	var hrBarycentre = layer.getShapesRef()[0].getCentroid();
	var hrCentreRotation = new HRDrawModule.HRPoint(hrBarycentre.__x + 50, hrBarycentre.__y, 0);
	layer.getShapesRef()[0].setRotationPoint(hrCentreRotation);
	//layer.Shapes[0].rotate(3.14/4, 500, 200);

	//mise en place temporaire de la rotation sur Shape 1
	var hrBarycentre = layer.getShapesRef()[1].getCentroid();
	var hrCentreRotation = new HRDrawModule.HRPoint(hrBarycentre.__x + 50, hrBarycentre.__y, 0);
	layer.getShapesRef()[1].setRotationPoint(hrCentreRotation);

	//Création d'une vue 2D sur le canvas avec son modèle
	var domCanvas = document.getElementById("mon_canvas");
	var hrView1 = new HRDrawModule.HR2DView(domCanvas, hRdocument);
	var views = new Array();
	views.push(hrView1);

	//création d'un controller spécialisé dans la sélection
	var hrSelector = new HRDrawModule.HRSelectorController(views);
	hrSelector.__document = hRdocument;//!TODO passer par des accesseurs.
	
	//Branchement des listerner sur la vue.
	hrView1.setController(hrSelector);
	
	//rendre le document
	hrView1.render();


}


