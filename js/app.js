const ingresos = [
  new Ingreso('Salario', 2100.00),
  new Ingreso('Venta coche', 1500),
]

const egresos = [
  new Egreso('Renta departamento', 900),
  new Egreso('Ropa', 400),
]

const cargarApp = () => {
  cargarCabecero()
  cargarEgresos()
  cargarIngresos()
}

const totalIngresos = () => {
  let totalIngresos = 0

  for (let ingreso of ingresos){
    totalIngresos += ingreso.valor
  }

  return totalIngresos
}

const totalEgresos = () => {
  let totalEgresos = 0

  for (let egreso of egresos){
    totalEgresos += egreso.valor
  }

  return totalEgresos
}

const cargarCabecero = () => {
  let presupuesto = totalIngresos() - totalEgresos()
  let porcentajeEgreso = totalEgresos() / totalIngresos()

  document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto)
  document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso)
  document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos())
  document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos())
}

const formatoMoneda = valor => {
  return valor.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })
}

const formatoPorcentaje = valor => {
  return valor.toLocaleString('en-US', {
    style: 'percent',
    minimumFractionDigits: 2
  })
}

const cargarIngresos = () => {
  let ingresosHTML = ''

  for(let ingreso of ingresos) {
    ingresosHTML += crearIngresoHTML(ingreso)
  }

  document.getElementById('lista-ingresos').innerHTML = ingresosHTML
}

const crearIngresoHTML = ingreso => {
  let ingresoHTML = `
   <div class="elemento limpiarEstilos">
     <div class="elemento_descripcion">${ingreso.descripcion}</div>
     <div class="derecha limpiarEstilos">
       <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
       <div class="elemento_eliminar">
         <button onclick="eliminarIngreso(${ingreso.id})" class="elemento_eliminar--btn">
            <ion-icon name="close-circle-outline"></ion-icon>
           </button>
       </div>
     </div>
   </div>
  `

  return ingresoHTML
}

const cargarEgresos = () => {
  let egresosHTML = ''

  for(let egreso of egresos) {
    egresosHTML += crearEgresoHTML(egreso)
  }

  document.getElementById('lista-egresos').innerHTML = egresosHTML
}

const crearEgresoHTML = egreso => {
  let egresoHTML = `
   <div class="elemento limpiarEstilos">
     <div class="elemento_descripcion">${egreso.descripcion}</div>
     <div class="derecha limpiarEstilos">
       <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
       <div class="elemento_porcentaje">60%</div>
       <div class="elemento_eliminar">
         <button onclick="eliminarEgreso(${egreso.id})" class="elemento_eliminar--btn">
          <ion-icon name="close-circle-outline"></ion-icon>
         </button>
       </div>
     </div>
   </div>
  `

  return egresoHTML
}

const eliminarIngreso = id => {
  let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id == id)
  ingresos.splice(indiceEliminar, 1)

  cargarCabecero()
  cargarIngresos()
}

const eliminarEgreso = id => {
  let indiceEliminar = egresos.findIndex(egreso => egreso.id == id)
  egresos.splice(indiceEliminar, 1)

  console.log(egresos)

  cargarCabecero()
  cargarEgresos()
}

const agregarDato = () => {
  let forma = document.forms['forma']
  let tipo = forma['tipo']
  let descripcion = forma['descripcion']
  let valor = forma['valor']

  if (descripcion.value !== '' && valor.value !== ''){
    if (tipo.value === 'ingreso'){
      ingresos.push(new Ingreso(descripcion.value, +valor.value))

      cargarCabecero()
      cargarIngresos()

      descripcion.value = ''
      valor.value = ''
    } else if (tipo.value === 'egreso') {
      egresos.push(new Egreso(descripcion.value, +valor.value))

      cargarCabecero()
      cargarEgresos()

      descripcion.value = ''
      valor.value = ''
    }
  }
}

cargarApp()
