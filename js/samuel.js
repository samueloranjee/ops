var id = new Number();

//Funções iniciais
function iniciar(){
	document.getElementsByClassName("btn btn-xs btn-danger")['0'].style.display = "none";
	document.getElementById("aviso").style.display = "none";
	//document.getElementById("formulario").style.display = "none";
}

function home(){
	document.getElementById("home").className = "active";
	document.getElementById("sobre").className = "";
	document.getElementById("titulo").innerHTML = "YouPlaylist";
	document.getElementById("conteudo").innerHTML = "O YouPlaylist é uma página que reune seus vídeos prediletos, contabilizando suas visualizações.";
}

function sobre(){
	document.getElementById("home").className = "";
	document.getElementById("sobre").className = "active";
	document.getElementById("titulo").innerHTML = "Sobre";
	document.getElementsByClassName("btn btn-xs btn-danger")['0'].style.display = "none";
	document.getElementById("conteudo").innerHTML = "O YouPlaylist é uma página criada como requisito avaliativo da disciplina de Novas Tecnologias.";
}

function atualizar(){
	id++;
	// Captura a referência da tabela com id “minhaTabela”
    var table = document.getElementById("tabela");
    // Captura a quantidade de linhas já existentes na tabela
    var numOfRows = table.rows.length;
    // Captura a quantidade de colunas da última linha da tabela
    var numOfCols = table.rows[numOfRows-1].cells.length;
    // Insere uma linha no fim da tabela.
    var newRow = table.insertRow(numOfRows);
    newRow.id = id;

    // Faz um loop para criar as colunas
    for (var j = 0; j < numOfCols; j++) {
    	// Insere uma coluna na nova linha 
        newCell = newRow.insertCell(j);
        // Insere um conteúdo na coluna
        //newCell.innerHTML = "Linha "+ numOfRows + " – Coluna "+ j;
        switch(j) { 
        	case 0:
        		var nome  = document.getElementById('inputName').value;
        		if (nome == ""){
        			nome = "(Sem nome)";
        		}else{
        			nome = nome;
        		}
				newCell.innerHTML = nome;
				newCell.className = "nome_" + id;
        		break;
    		case 1:
    			var link  = document.getElementById('inputLink').value;
    			YouTubeGetID(link);
        		newCell.innerHTML = "<a href='" + link + "'>http://youtu.be/" + cod + "</a>";
        		//newCell.innerHTML = "<center><a href='" + link + "'><img src=\"images/YouTube.png\"></a></center>";
				newCell.className = "link_" + id;
        		break;
    		case 2:
    			var views  = document.getElementById('inputView').value;
        		newCell.innerHTML = views;        		
				newCell.className = "views_" + id;
        		break;
    		case 3:
    			var classe = "buttons_" + id;
    			newCell.className = classe;
    			buttons(classe);
        		break;
    		default:
        		newCell.innerHTML = numOfRows-1;
        		newCell.className = id;
			}
        }
}

//Funções do funcionais
function novo(){
	document.getElementById("aviso").style.display = "block";
	document.getElementById("menu").innerHTML = "<button type=\"button\" class=\"btn btn-xs btn-success\" onclick=\"criar()\">Criar</button> <button type=\"button\" class=\"btn btn-xs btn-warning\" onclick=\"cancelar()\">Cancelar</button>";
	document.getElementById("aviso").style.visibility = "visible";
	document.getElementById("aviso").className = "alert alert-info";
	document.getElementById("aviso").innerHTML = "<strong>Preencha o formulário!</strong> Preencha de acordo com as colunas.";
	document.getElementById("formulario").style.display = "table-row";
	document.getElementById("formulario").style.visibility = "visible";
	document.getElementById("inputLink").disabled = false;
	document.getElementById("inputView").disabled = false;
}

function criar(){
	document.getElementById("aviso").className = "alert alert-success";
	document.getElementById("aviso").innerHTML = "<strong>Salvo com sucesso!</strong> As informações foram salvas com sucesso.";
	document.getElementById("formulario").style.display = "none";
	atualizar();
	document.getElementById('inputName').value="";
	document.getElementById('inputLink').value="";
}

function cancelar(){
	document.getElementById("aviso").style.display = "block";
	document.getElementById("aviso").className = "alert alert-warning";
	document.getElementById("aviso").innerHTML = "<strong>Operação cancelada!</strong> A operação foi cancelada com sucesso.";
	//document.getElementById("menu").innerHTML = "<button type=\"button\" id="" class=\"btn btn-xs btn-success\" onclick=\"criar()\">Criar</button> <button type=\"button\" class=\"btn btn-xs btn-warning\" onclick=\"cancelar()\">Cancelar</button>";
	document.getElementById("formulario").style.display = "none";
	document.getElementById('inputName').value="";
	document.getElementById('inputLink').value="";
}

function visualizar(e){
	document.getElementById("home").className = "active";
	document.getElementById("sobre").className = "";
	document.getElementById("aviso").style.display = "none";
	var elemento = e.target.id;
	var addview = document.getElementsByClassName("views_" + elemento)['0'].firstChild.nodeValue;
	var num_view = parseInt(addview) + parseInt(1);
	document.getElementsByClassName("views_" + elemento)['0'].innerHTML = num_view;	
	var titulo = document.getElementsByClassName("nome_" + elemento)['0'].firstChild.nodeValue;
	if (num_view == 1){
		var v = "view";
	} else {
		var v = "views";
	}
	document.getElementById("titulo").innerHTML = titulo + ' (' + num_view + ' ' + v + ') <button type=\"button\" class=\"btn btn-xs btn-danger\" onclick=\"fechar()\">Fechar</button>';
	var youtube = document.getElementsByClassName("link_" + elemento)['0'].firstChild.href;
	YouTubeGetID(youtube);
	document.getElementById("conteudo").innerHTML = "<iframe src='http://www.youtube.com/embed/" + cod + "' frameborder='0' allowfullscreen></iframe>";
}

function fechar(){
	home();
}

function editar(e){		
	document.getElementById("aviso").style.display = "none";	
	document.getElementById("formulario").style.display = "table-row";
	document.getElementById("inputLink").disabled = true;	
	document.getElementById("inputView").disabled = true;
	var elemento = e.target.id;	
	var nome = document.getElementsByClassName("nome_" + elemento)['0'].firstChild.nodeValue;
	var a = nome;
	document.getElementById("inputName").value = nome;
	var youtub = document.getElementsByClassName("link_" + elemento)['0'].firstChild.href;
	var b = youtub;
	document.getElementById("inputLink").value = youtub;
	var visu = document.getElementsByClassName("views_" + elemento)['0'].firstChild.nodeValue;
	document.getElementById("inputView").value = visu;
	document.getElementById("menu").innerHTML = "<button type=\"button\" id='"+elemento+"' class=\"btn btn-xs btn-success\" onclick=\"salvar(event)\">Salvar</button> <button type=\"button\" class=\"btn btn-xs btn-warning\" onclick=\"cancelar()\">Cancelar</button>";
	document.getElementById("formulario").style.visibility = "visible";	
}

function salvar(e){	
	var elemento = e.target.id;	
	var novo_nome  = document.getElementById('inputName').value;
	document.getElementsByClassName("nome_" + elemento)['0'].innerHTML = novo_nome;
	document.getElementById("aviso").className = "alert alert-success";
	document.getElementById("aviso").innerHTML = "<strong>Atualizada com sucesso!</strong> As informações foram atualizadas com sucesso.";
	//document.getElementById("menu").innerHTML = "<button type=\"button\" class=\"btn btn-xs btn-success\" onclick=\"criar()\">Criar</button> <button type=\"button\" class=\"btn btn-xs btn-warning\" onclick=\"cancelar()\">Cancelar</button>";
	document.getElementById("formulario").style.display = "none";
	document.getElementById('inputName').value="";
	document.getElementById('inputLink').value="";
}

function excluir(e){
	document.getElementById("aviso").style.display = "none";
	var r = confirm("Esses dados serão excluídos para sempre!!!");
	if (r == true) {
    	document.getElementById("aviso").style.display = "block";
		document.getElementById("aviso").style.visibility = "visible";
		document.getElementById("aviso").className = "alert alert-danger";
		document.getElementById("aviso").innerHTML = "<strong>Excluído com Sucesso!</strong> Informações excluídas com sucesso.";
		var elemento = e.target.id;
		var deletando = document.getElementById(elemento);
		deletando.parentNode.removeChild(deletando);
	} else {
    	cancelar();
	}
	
}

function buttons(classe){
	document.getElementsByClassName(classe)['0'].innerHTML = '<button type=\"button\" class=\"btn btn-xs btn-primary\" id=\"' + id + '\" onclick=\"visualizar(event)\">Visualizar</button> <button type=\"button\" class=\"btn btn-xs btn-success\" id=\"' + id + '\" onclick=\"editar(event)\">Editar</button> <button type=\"button\" class=\"btn btn-xs btn-danger\" id=\"' + id + '\" onclick=\"excluir(event)\">Excluir</button>';
}

function SomenteNumero(e){
	var tecla=(window.event)?event.keyCode:e.which;
	if((tecla>47 && tecla<58)) return true;
 	else{
 		if (tecla==8 || tecla==0) return true;
 		else  return false;
 	}
}

function YouTubeGetID(url){
	var code = '';
	url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
	if(url[2] !== undefined) {
		cod = url[2].split(/[^0-9a-z_]/i);
    	cod = cod[0];
  	} else {
    	cod = url;
  	}
    return cod;
    //alert(cod);
}