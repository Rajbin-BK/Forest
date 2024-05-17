
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Scene setup
const scene = new THREE.Scene();
// Adding fog to the scene
const fogColor = 0xfffff1; // White fog
const fogDensity = 0.01; // Density of the fog
scene.fog = new THREE.FogExp2(fogColor, fogDensity);


// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);


// Renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);



/// Load the grass texture
const loader = new THREE.TextureLoader();


const grassTexture = loader.load('./Pictures/grass.png', texture => {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(60,60);  // Adjust the repetition for better visual results
});

/// Load the grass texture
const gTexture = loader.load('./Pictures/leaf.png', texture => {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);  // Adjust the repetition for better visual results
});

/// Load the grass texture
const g1Texture = loader.load('./Pictures/g1.jpg', texture => {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6, 6);  // Adjust the repetition for better visual results
});

const g2Texture = loader.load('./Pictures/g1.jpg', texture => {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6, 6);  // Adjust the repetition for better visual results
});

const bTexture = loader.load('./Pictures/branch.jpg', texture => {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(10,10);  // Adjust the repetition for better visual results
});


// Create the circular ground plane
const circleRadius = 80;
const geometry = new THREE.CircleGeometry(circleRadius, 32);
const material = new THREE.MeshBasicMaterial({ map: grassTexture, side: THREE.DoubleSide });
const circle = new THREE.Mesh(geometry, material);
circle.rotation.x = -Math.PI / 2;
scene.add(circle);


// Skydome creation
function createskydome(){
const geometry = new THREE.SphereGeometry( 200, 32, 32 ); 
const material = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader( ).load("./Pictures/sky1.jpg"), side: THREE.DoubleSide} ); 
const skydome = new THREE.Mesh( geometry, material );
scene.add(skydome);
}
createskydome();

//creating the tree
function createTree() {
  const tree = new THREE.Group();
  // Tree trunk (cylinder)
  const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.5, 5, 12);
  const trunkMaterial = new THREE.MeshLambertMaterial({map: bTexture, side: THREE.DoubleSide});
  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
  trunk.position.y=2.5;
  tree.add(trunk); // Add trunk to tree group

  // Tree foliage (cone)
  const foliageGeometry = new THREE.ConeGeometry(4, 10, 16);
  const foliageMaterial = new THREE.MeshLambertMaterial({map: g1Texture, side: THREE.DoubleSide });
  const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
  foliage.position.y=6; // Position foliage on top of the trunk
  tree.add(foliage); // Add foliage to tree group

  return tree;
}

//creating the second kind tree
function createTree2() {
  const tree = new THREE.Group();

// Create the trunk
const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.5, 4, 32);
const trunkMaterial = new THREE.MeshLambertMaterial({map: bTexture, side: THREE.DoubleSide});
const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
trunk.position.y = 2;
tree.add(trunk);

// Create the main foliage
const foliageGeometry = new THREE.SphereGeometry(2, 32, 32);
const foliageMaterial = new THREE.MeshLambertMaterial({map: gTexture, side: THREE.DoubleSide });
const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
foliage.position.y = 5;
tree.add(foliage);

// Branch geometry and material
const branchGeometry = new THREE.CylinderGeometry(0.1, 0.3, 3, 32);
const branchMaterial = new THREE.MeshLambertMaterial({map: bTexture, side: THREE.DoubleSide});

// Create and position the first branch
const branch1 = new THREE.Mesh(branchGeometry, branchMaterial);
branch1.position.set(-1.2, 2.5, 0); // Position adjusted for visual effect
branch1.rotation.z = Math.PI / 4; // Rotate to angle upwards
tree.add(branch1);

// Create and position the second branch
const branch2 = new THREE.Mesh(branchGeometry, branchMaterial);
branch2.position.set(1.2, 1.8, 0); // Position adjusted for visual effect
branch2.rotation.z = -Math.PI / 4; // Rotate to angle upwards
tree.add(branch2);

const branch3 = new THREE.Mesh(branchGeometry, branchMaterial);
branch3.position.set(0, 1.5, 1); // Position adjusted for visual effect
branch3.rotation.x = Math.PI / 4; // Rotate to angle upwards
tree.add(branch3);

const branch4 = new THREE.Mesh(branchGeometry, branchMaterial);
branch4.position.set(0, 2.2, -1); // Position adjusted for visual effect
branch4.rotation.x = -Math.PI / 4; // Rotate to angle upwards
tree.add(branch4);

// Adjust foliage positions to connect with branches
const branchFoliageGeometry = new THREE.SphereGeometry(1, 32, 32);
const branchFoliageMaterial = new THREE.MeshLambertMaterial({map: gTexture, side: THREE.DoubleSide });

const branch1Foliage = new THREE.Mesh(branchFoliageGeometry, branchFoliageMaterial);
branch1Foliage.position.set(-2.8, 4.2, 0);
tree.add(branch1Foliage);

const branch2Foliage = new THREE.Mesh(branchFoliageGeometry, branchFoliageMaterial);
branch2Foliage.position.set(2.8, 3.5, 0);
tree.add(branch2Foliage);

const branch3Foliage = new THREE.Mesh(branchFoliageGeometry, branchFoliageMaterial);
branch3Foliage.position.set(0, 3.1, 2.5);
tree.add(branch3Foliage);

const branch4Foliage = new THREE.Mesh(branchFoliageGeometry, branchFoliageMaterial);
branch4Foliage.position.set(0, 3.7, -2.5);
tree.add(branch4Foliage);
  return tree;
}

//creating the third kind of tree
function createTree3() {
  const tree = new THREE.Group();

// Create the trunk
const trunkGeometry = new THREE.CylinderGeometry(0.6, 0.9, 4, 32);
const trunkMaterial = new THREE.MeshLambertMaterial({ map: bTexture, side: THREE.DoubleSide});
const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
trunk.position.y=2;
tree.add(trunk);

// Create the main foliage
const foliageGeometry = new THREE.SphereGeometry(2, 32, 32);
const foliageMaterial = new THREE.MeshLambertMaterial({map: g2Texture, side: THREE.DoubleSide });
const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
foliage.position.y = 4;
tree.add(foliage);

return tree;
}

let treePositions = [];

function isCollision(x, z, treeRadius) {
    for (let pos of treePositions) {
        let dx = pos.x - x;
        let dz = pos.z - z;
        let distance = Math.sqrt(dx * dx + dz * dz);
        if (distance < (pos.radius + treeRadius)) {
            return true;
        }
    }
    return false;
}

function placeTrees(createTreeFunc, count, minRadius, maxRadius) {
  for (let i = 0; i < count; i++) {
      let x, z, distance, treeRadius;
      do {
          x = Math.random() * 2 * circleRadius - circleRadius; // Random X within the circle's diameter
          z = Math.random() * 2 * circleRadius - circleRadius; // Random Z within the circle's diameter
          treeRadius = Math.random() * (maxRadius - minRadius) + minRadius; // Random radius for each tree
          distance = Math.sqrt(x * x + z * z);
      } while (distance > circleRadius || isCollision(x, z, treeRadius));

      const tree = createTreeFunc();
      tree.position.set(x, 0, z);
      let scale = treeRadius / maxRadius; // Scale the tree based on its radius
      tree.scale.setScalar(scale);
      scene.add(tree);
      treePositions.push({ x: x, z: z, radius: treeRadius }); // Use the randomized radius for collision checking
  }
}

// Example of placing various types of trees with variable radii
placeTrees(createTree, 100, 1, 1);   // Small to medium trees
placeTrees(createTree2, 105, 3, 3);  // Medium to large trees
placeTrees(createTree3, 100, 4,5 );  // Large trees

// Lighting (optional, depending on your texture)
const light = new THREE.DirectionalLight(0xffffff);
light.position.set(0, 0, 15);
scene.add(light);

camera.position.y= 5;
camera.position.z = 55;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
