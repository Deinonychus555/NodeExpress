var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var app = express();

router.use(bodyParser.urlencoded({extended: true}));

function estaRegistrado(usuario, password) {

	var existeUsuario = eval("app.locals." + usuario )  !== undefined;
	
	if (!existeUsuario) {
		return false;
	}
	else if (existeUsuario && arguments.length === 1) {
		return true;
	}
	
	return  eval("app.locals." + usuario + ".pass") === password ;
}



router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/identificar', function(req, res, next) {
	console.log("usuario: " + req.body.usuarioLog);
	console.log("usuario: " + req.body.passLog);
	
	if (!estaRegistrado(req.body.usuarioLog,req.body.passLog)) {
		res.send ("Usuario o contraseña incorrecta<br><a href='/login'>Volver</a>")
	}
	else {
  		res.redirect('/main/' + req.body.usuarioLog + "?registrado=true");
	}

});

router.post('/registrar', function(req, res, next) {

	console.log("usuario: " + req.body.usuarioReg );
	console.log("usuario: " + req.body.passReg);

	if (!estaRegistrado(req.body.usuarioReg)) {
	
		eval("app.locals." + req.body.usuarioReg  + "={}");
		eval("app.locals." + req.body.usuarioReg  + ".pass=" + "'" + req.body.passReg  + "'");
		res.redirect("/main/" + req.body.usuarioReg + "?registrado=true");
	}	
	
 	else {

	  res.send("Ya existe un usuario registrado con ese nombre");
	}

});


module.exports = router;
