const alimentosview = {
    template: `
    <div>
        <h3 class="d-flex justify-content-center">Inventario de Alimentos</h3>
        <button type="button" class="btn btn-secondary m-2 fload-end"
        data-bs-toggle="modal" data-bs-target="#createModal" @click="addClick()">
            Agregar producto
        </button>
        <table class="table table-striped">
            <thead>
                <tr>         
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Categoria</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="producto in productos">
                    <td>{{producto.producto_id}}</td>
                    <td>{{producto.nombre}}</td>
                    <td>{{producto.categoria}}</td>
                    <td>{{producto.precio}}</td>
                    <td>{{producto.cantidad}}</td>
                    <td>
                        <button type="button" 
                        class="btn btn-dark mr-1"
                        data-bs-toggle="modal" data-bs-target="#updateModal" 
                        @click="editClick(producto)">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button type="button" 
                        class="btn btn-dark mr-1"
                        @click="deleteClick(producto.producto_id)">                     
                            <i class="bi bi-trash-fill"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="modal fade" id="createModal" tabindex="-1"
            aria-labelledby="createModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="createModalLabel">{{modalTitle}}</h5>
                        <button type="button" class="close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group mb-3">
                            <span class="input-group-text">Nombre producto</span>
                            <input type="text" class="form-control" v-model="nombre" placeholder="Escriba el nombre del producto">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Categoria</span>
                            <input type="text" class="form-control" v-model="categoria" placeholder="Escriba la categoria del producto"> 
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Precio</span>
                            <input type="number" class="form-control" v-model="precio">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Cantidad</span>
                            <input type="number" class="form-control" v-model="cantidad">
                        </div>
                        <button type="button" @click="createClick()"
                        class="btn btn-secondary">
                            Crear producto
                        </button>                   
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="updateModal" tabindex="-1"
            aria-labelledby="updateModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="updateModalLabel">{{modalTitle}}</h5>
                        <button type="button" class="close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group mb-3">
                            <span class="input-group-text">ID producto</span>
                            <input type="number" class="form-control" v-model="producto_id" readonly>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Nombre producto</span>
                            <input type="text" class="form-control" v-model="nombre" placeholder="Escriba el nombre del producto">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Categoria</span>
                            <input type="text" class="form-control" v-model="categoria" placeholder="Escriba la categoria del producto"> 
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Precio</span>
                            <input type="number" class="form-control" v-model="precio">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Cantidad</span>
                            <input type="number" class="form-control" v-model="cantidad">
                        </div>
                        <button type="button" @click="updateClick()"
                        class="btn btn-secondary">
                            Actualizar producto
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,

    data() {
        return {
            productos: [],
            modalTitle: '',
            nombre: '',
            categoria: '',
            precio: 0,
            cantidad: 0,
            producto_id: 0
        }
    },
    methods: {
        getProductos() {
            axios.get(variables.API_URL + 'producto')
            .then(response => {
                this.productos = response.data;
            });
        },
        addClick() {
            this.modalTitle = 'Agregar producto';
            this.producto_id = 0;
            this.nombre = '';
            this.categoria = '';
            this.precio = 0;
            this.cantidad = 0;
        },
        editClick(producto) {
            this.modalTitle = 'Actualizar producto';
            this.producto_id = producto.producto_id;
            this.nombre = producto.nombre;
            this.categoria = producto.categoria;
            this.precio = producto.precio;
            this.cantidad = producto.cantidad;
        },
        createClick() {
            axios.post(variables.API_URL + 'producto', {
                nombre: this.nombre,
                categoria: this.categoria,
                precio: this.precio,
                cantidad: this.cantidad
            })
            .then(response => {
                this.getProductos();
                alert('Producto creado con exito!', response.data);
            });
        },
        updateClick() {
            axios.put(variables.API_URL + 'producto', {
                producto_id: this.producto_id,
                nombre: this.nombre,
                categoria: this.categoria,
                precio: this.precio,
                cantidad: this.cantidad
            })
            .then(response => {
                this.getProductos();
                alert('Producto actualizado con exito!', response.data);
            });
        },
        deleteClick(producto_id) {
            if(!confirm('¿Esta seguro de eliminar el producto?')) {
                return;
            }
            axios.delete(variables.API_URL + 'producto/' + producto_id)
            .then(response => {
                this.getProductos();
                alert('Producto eliminado con exito!', response.data);
            });
        }
    },
    mounted:function() {
        this.getProductos();
    }
}