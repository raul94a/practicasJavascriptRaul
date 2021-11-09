
//PRACTICA 1
let grupos = [];
let alumnos = [];

let existeIdGrupo = (cod) => {
    let existe = false;
    grupos.forEach(element => {
        if (element['id'] == cod) existe = true;
    });
    return existe;
};

let devuelveIdGrupoMayorSumandoleUno = (cod, type = 'grupos') => {
    let mayor = 0;
    if (type == 'grupos') {
        grupos.forEach(element => {
            if (element['id'] > mayor) {
                mayor = element['id'];
            }
        });
        return (mayor + 1);
    } else {
        alumnos.forEach(e => {
            if (e['id'] > mayor) {
                mayor = e['id'];
            }
        });
        return (mayor + 1);
    }
};
let existeCodigo = (cod) => {
    let existe = false;
    grupos.forEach(element => {
        if (element['cod'] == cod) existe = true;
    });
    return existe;
}

const obtenerGrupoById = id => {
    return grupos.filter((e) => e['id'] === id)[0];

}

let addGroup = (id, cod, nombre, grado = 'S', familia) => {
    grados = ['S', 'M']
    if (!grados.includes(grado)) {
        throw 'Error. el grado debe tener un valor de S o de M'
    }
    if (cod == '' || nombre == '' || grado == '' || familia == '') {
        throw 'Error. Alguno de los datos NO es correcto. No puede haber datos vacios';
    }
    if (existeIdGrupo(id)) {
        id = devuelveIdGrupoMayorSumandoleUno(id);
    }
    if (existeCodigo(cod)) {
        throw 'El codigo de grupo ya existe en el registro. No se ha podido generar el grupo';
    }
    let grupo = { "id": id, "cod": cod, "nombre": nombre, "grado": grado, "familia": familia }
    grupos.push(grupo);
    return grupo;
}

let changeGroup = (id, cod, nombre, grado, familia) => {
    let grupo = obtenerGrupoById(id);

    if (cod == '' || nombre == '' || grado == '' || familia == '') {
        throw 'Error. Alguno de los datos NO es correcto. No puede haber datos vacios';
    }

    if (grupo && (grado == 'M' || grado == 'S')) {
        grupo['cod'] = cod;
        grupo['nombre'] = nombre;
        grupo['grado'] = grado;
        grupo['familia'] = familia;
        console.log('El Objeto ha sido cambiado correctamente!!!!!')
    } else {
        throw 'Error. Los valores del grado solo pueden tomar M o S'
    }
};

let obtenerPosicionDeGrupo = id => {
    return grupos.findIndex(e => e['id'] == id);
}

let delGroup = id => {
    let grupo = obtenerGrupoById(id);
    if (!grupo) {
        throw 'Error. El grupo no ha sido encontrado';
    }
    let posicion = obtenerPosicionDeGrupo(id);
    let borrado = prompt(`¿Estás seguro que quieres borrar el grupo ${grupo['nombre']}? si / no`);
    if (borrado.toLowerCase() == 'si') {
        grupos.splice(posicion, 1);
        return (`El grupo ${grupo['nombre']} ha sido borrado con éxito.`)
    }
    return ('El grupo NO ha sido borrado')

};

let contieneArroba = email => email.includes('@');
let existeIdAlumno = id => {
    let existe = false;
    alumnos.forEach(e => {
        if (e['id'] === id) existe = true;
    });
    return existe;
}

let addPupil = (id, nombre, email, fecnac, foto, grupo) => {
    if (nombre == '' || email == '') {
        throw 'Error.El nombre o el email están vacíos';
    }
    if (!existeIdGrupo(grupo)) {
        throw 'Error. El id del grupo no existe!';
    }
    if (!contieneArroba(email)) {
        alert('El email no contiene @')
        return;
    }
    if (existeIdAlumno(id)) {
        id = devuelveIdGrupoMayorSumandoleUno(id, 'alumnos');
    }

    alumnos.push({ "id": id, "nombre": nombre, "email": email, "fecnac": fecnac, "foto": foto, "grupo": grupo });
}
let obtenerPupilById = id => alumnos.filter(e => e.id == id)[0];
let changePupil = (id, nombre, email, fecnac, foto, grupo) => {
    if (nombre == '' || email == '') {
        throw 'Error. El nombre y el email NO puede estar vacios!!';
    }
    if (!contieneArroba(email)) {
        throw 'Error. El email no es correcto';
    }
    if (!existeIdGrupo(grupo)) {
        throw 'Error. El grupo no existe!';
    }
    if (!existeIdAlumno(id)) {
        throw 'Error. El alumno no existe!';
    }

    let alumno = obtenerPupilById(id);
    alumno.nombre = nombre;
    alumno.email = email;
    alumno.fecnac = fecnac;
    alumno.foto = foto;
    alumno.grupo = grupo;
    console.log('Alumno modificado correctmente');


}
let obtenerPosicionAlumno = id => alumnos.findIndex(e => e.id === id);

let delPupil = id => {
    let alumno = obtenerPupilById(id);
    console.log(alumno);
    if (!alumno) {
        console.error('Error. El alumno no ha sido encontrado');
    }
    let posicion = obtenerPosicionAlumno(id);
    let borrado = prompt(`¿Estás seguro que quieres borrar el alumno ${alumno['nombre']}? si / no`);
    if (borrado.toLowerCase() == 'si') {
        alumnos.splice(posicion, 1);
        alert(`El alumno ${alumno['nombre']} ha sido borrado con éxito.`)
    } else {
        alert('El alumno NO ha sido borrado')
    }
};
//PRUEBAS
/*
try{
    addGroup(1,'DAM','Desarrollo de Aplicaciones Multiplataforma','S','Informática');
}catch(e){
    console.log(e);
}

try{
    addGroup(1,'SMR','Sistemas Microinformáticos y Redes','X','Informática');
}catch(e){
    console.log(e);
}
try{
    addPupil(1,'David','David@gmail.com','', '', 1);

}catch(e){
    console.log(e)
}
try{
    addPupil(1,'Flavio','Flavio@gmail.com','20001212', '', 1);

}catch(e){
    console.log(e)
}
try{
    addPupil(1,'pablo', 'pablo@albin', '', '', 3);

}catch(e){
    console.log(e)
}
*/

const btnEnviarAdd = document.querySelector('.form-controls button[type="submit"]');
const tabla = document.getElementById('grupos');
const mensajes = document.getElementById('message');

let addElementToTable = (object) => {
    let tr = document.createElement('tr');
    for (let o in object) {
        let td = document.createElement('td');
        td.textContent = object[o];
        tr.append(td);
    }
    tabla.append(tr);
}
let updateTotal = () => {
    const totalGroups = grupos.length;
    const totalGroupsParagraph = document.getElementById('total-grupos');
    totalGroupsParagraph.innerHTML = "TOTAL: " + totalGroups;
}
let limpiarForm = (...values) => {
    for (let value of values) {
        value.value = ''
    }
}

let renderErrorMessage = (error) => {
    mensajes.innerHTML = '';
    let p = document.createElement('p');
    p.textContent = error;
    mensajes.append(p);
}


btnEnviarAdd.addEventListener('click', (e) => {
    e.preventDefault();
    //capturamos los valores del form
    const id = document.getElementById('newgroup-id');
    const codigo = document.getElementById('newgroup-cod');
    const nombre = document.getElementById('newgroup-name');
    const grado = document.querySelector('input[type="radio"]:checked');
    const familia = document.getElementById('newgroup-family');
    //comprobamos que ninguno esté vacío
    if (codigo.value === '' || nombre.value === '' || grado.value === '' || familia.value === '') {
        return;
    }
    //generamos el grupo
    let grupo = '';
    try {
        grupo = addGroup(parseInt(id.value), codigo.value, nombre.value, grado.value, familia.value);
        //ahora habría que añadirlo al a tabla
        addElementToTable(grupo);
        //actualizamos el total de registros
        updateTotal();


    } catch (e) {
        renderErrorMessage(e);
    }

    limpiarForm(codigo, nombre, familia);

});


const btnEnviarDel = document.querySelector('#delgroup .form-controls button[type="submit"]');

btnEnviarDel.addEventListener('click', (e) => {
    e.preventDefault();
    const id = document.getElementById('delgroup-id');
    //comprobamos que NO esté vacio. Si está vacío no haremoas nada
    if (id.value == '') return;
    try {
        delGroup(parseInt(id.value));
        let trs = Array.from(document.querySelectorAll('tr'));

        for (let tr of trs) {

            let td = tr.firstElementChild;
            if (td.textContent == id.value) {
                encontrado = true;
                tr.remove();
                break;
            }
        }
        updateTotal();
    } catch (e) {
        renderErrorMessage(e);
    }


    limpiarForm(id)
});
