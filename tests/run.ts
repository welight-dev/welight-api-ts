import * as api_doador from "../lib/modules/doador"
import * as api_config from "../lib/modules/config"

api_config.Environment.set('local');

let doador = new api_doador.Doador

doador.login('admin@welight.co', '123').then(
	function(data){
	        console.log(data.nome);
		data.doacao.init().then(
			function(p){
			    console.log(p);
			}
		)


		)
	}
)
