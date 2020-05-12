import * as api_doador from "../lib/modules/doador"
import * as api_config from "../lib/modules/config"

api_config.Environment.set('dev');

let doador = new api_doador.Doador

doador.login('admin@welight.co', '123').then((data) => {
	console.log(data.nome);
}).catch(()=>{});
