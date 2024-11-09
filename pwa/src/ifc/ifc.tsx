import { useEffect } from 'react';
import * as WEBIFC from 'web-ifc';
import * as BUI from '@thatopen/ui';
import * as OBC from '@thatopen/components';

function Ifc() {


  useEffect(() => {
    const container = document.getElementById("container")!;

    const components = new OBC.Components();
  
    const worlds = components.get(OBC.Worlds);
  
    const world = worlds.create<
      OBC.SimpleScene,
      OBC.SimpleCamera,
      OBC.SimpleRenderer
    >();
  
    world.scene = new OBC.SimpleScene(components);
    world.renderer = new OBC.SimpleRenderer(components, container);
    world.camera = new OBC.SimpleCamera(components);
  
    components.init();
  
    world.camera.controls.setLookAt(12, 6, 8, 0, 0, -10);
  
    world.scene.setup();
  
    const grids = components.get(OBC.Grids);
    grids.create(world);

        // Load and display the IFC model
        const loadIFC = async () => {
            const fragments = components.get(OBC.FragmentsManager);
            const fragmentIfcLoader = components.get(OBC.IfcLoader);
            await fragmentIfcLoader.setup();
            const file = await fetch(
                "https://thatopen.github.io/engine_components/resources/small.ifc",
              );

            const data = await file.arrayBuffer();
            const buffer = new Uint8Array(data);
            const model = await fragmentIfcLoader.load(buffer);

            
            world.scene.three.add(model);
            fragments.onFragmentsLoaded.add((model) => {
            console.log(model);
            });
          };
      
          loadIFC();
  }, [])

  return (
    <>
     
    </>
  )
}

export default Ifc
