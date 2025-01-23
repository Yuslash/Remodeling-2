import React, { Component } from "react"
import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { AnimationMixer, Clock } from "three"

class NewSurfaceClass extends Component {
    constructor(props) {
        super(props)
        this.state = {
            scene: null
        }
        this.mixer = null
        this.clock = new Clock()
    }

    componentDidMount() {
        const loader = new GLTFLoader()
        loader.load(this.props.filename, (gltf) => {
            const scene = gltf.scene
            const animations = gltf.animations

            if (animations.length > 0) {
                this.mixer = new AnimationMixer(scene)
                animations.forEach((clip) => this.mixer.clipAction(clip).play())
            }

            this.setState({ scene })
            this.animate()
        })
    }

    componentWillUnmount() {
        if (this.mixer) this.mixer.stopAllAction()
    }

    animate = () => {
        if (this.mixer) this.mixer.update(this.clock.getDelta())
        requestAnimationFrame(this.animate)
    }

    render() {
        if (!this.state.scene) return null

        return (
            <div className="w-full h-full bg-black">
                <Canvas camera={{ position: [0, 5, 30] }}>
                    <ambientLight />
                    <directionalLight />
                    <primitive object={this.state.scene} />
                    <OrbitControls />
                </Canvas>
            </div>
        )
    }
}

export default NewSurfaceClass
