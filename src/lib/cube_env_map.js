AFRAME.registerComponent("cube-env-map", {
    schema: {
        path: {default: ''},
        extension: {default: 'jpg'},
        format: {default: 'RGBFormat'},
        enableBackground: {default: false}
    },

    init: function () {
        const data = this.data;
        var posx = ".\assets\images\skybox\posx.jpg";
        var negx = ".\assets\images\skybox\negx.jpg";
        var posy = ".\assets\images\skybox\posy.jpg";
        var negy = ".\assets\images\skybox\negy.jpg";
        var posz = ".\assets\images\skybox\posz.jpg";
        var negz = ".\assets\images\skybox\negz.jpg";
        this.texture = new THREE.CubeTextureLoader().load([posx,negx,posy,negy,posz,negz]);
        this.texture.format = THREE[data.format];

        if (data.enableBackground) {
        this.el.sceneEl.object3D.background = this.texture;
        }

        this.applyEnvMap();
        this.el.addEventListener('object3dset', this.applyEnvMap.bind(this));
    },

    applyEnvMap: function () {
        const mesh = this.el.getObject3D('mesh');
        const envMap = this.texture;

        if (!mesh) return;

        mesh.traverse(function (node) {
        if (node.material && 'envMap' in node.material) {
            node.material.envMap = envMap;
            node.material.needsUpdate = true;
        }
        });
    }
    });