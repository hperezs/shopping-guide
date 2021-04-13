import { useEffect, useState } from "react";
import Actions from "../components/Actions";
import Answer from "../components/Answer";
import Cart from "../components/Cart";
import Question from "../components/Question";
import { default_steps } from "../lib/steps";
import ReactNotification, { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import Image from 'next/image'
import ProgressBar from "../components/ProgressBar";

export default function Guide() {
    const [ steps, setSteps ] = useState(default_steps)
    const [ currentStep, setCurrentStep ] = useState(1);
    const [ cameras, setCameras ] = useState([]);
    const [ selectedNVR, setSelectedNVR ] = useState('');
    const [ selectedHardDrives, setSelectedHardDrives ] = useState([]);
    const [ selectedSMProducts, setSelectedSMProducts ] = useState([]);
    const [ homeOrBusiness, setHomeOrBusiness ] = useState('');
    const [ cablesType, setCablesType ] = useState('');
    const [ allProducts, setAllProducts ] = useState([]);
    const [ indoorCables, setIndoorCables ] = useState([]);
    const [ outdoorCables, setOurdoorCables ] = useState([]);
    const [ selfMadeProducts, setSelfMadeProducts ] = useState([]);
    const [ hardDrives, setHardDrives ] = useState([])
    const [ videoRecorders, setAllVideoRecorders ] = useState([]);
    const [ monitorProducts, setMonitorProducts ] = useState([]);
    const [ mountProducts, setMountProducts ] = useState([]);
    const [ powerInjectors, setPowerInjectors ] = useState([]);
    const [ selectedMonitor, setSelectedMonitor ] = useState('');
    const [ selectedPowerInjectors, setSelectedPowerInjectors ] = useState([]);
    const [ subtotal, setSubtotal ] = useState(0.00);
    const [ isInstallationSelected, setIsInstallationSelected ] = useState(null);
    const [ canClickNext, setCanClickNext ] = useState(false);

    const bearerToken = process.env.BEARER_TOKEN;

    useEffect(() => {
        console.log(homeOrBusiness)
    }, [homeOrBusiness, isInstallationSelected])

    // Fetch all necessary products
    useEffect(() => {
        fetch('/api/getAllProducts')
            .then(response => {
                response.json().then(data => {
                    console.log(data);
                    setAllProducts(data);
                })
            })
        fetch('/api/getVideoRecorders')
            .then(response => {
                response.json().then(data => {
                    console.log(data);
                    setAllVideoRecorders(data);
                })
            })

        // Get Cables from Magento API
        const getIndoorCables_url = 'https://morning-anchorage-80357.herokuapp.com/https://backstreet-surveillance.com/rest/default/V1/products?searchCriteria[filterGroups][0][filters][0][field]=sku&searchCriteria[filterGroups][0][filters][0][conditionType]=like&searchCriteria[filterGroups][0][filters][0][value]=cat6-%25'
        fetch(getIndoorCables_url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + bearerToken
            }
        }).then(response => {
            response.json().then(data => {
                console.log(data.items);
                setIndoorCables(data.items)
            })
        })

        const getOutdoorCables_url = 'https://morning-anchorage-80357.herokuapp.com/https://backstreet-surveillance.com/rest/default/V1/products?searchCriteria[filterGroups][0][filters][0][field]=sku&searchCriteria[filterGroups][0][filters][0][conditionType]=like&searchCriteria[filterGroups][0][filters][0][value]=db-cat6-%25'
        fetch(getOutdoorCables_url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + bearerToken
            }
        }).then(response => {
            response.json().then(data => {
                console.log(data.items);
                setOurdoorCables(data.items);
            })
        })

        const getSelfMadeCables_url = 'https://morning-anchorage-80357.herokuapp.com/https://backstreet-surveillance.com/rest/default/V1/products?searchCriteria[filterGroups][0][filters][0][field]=sku&searchCriteria[filterGroups][0][filters][0][conditionType]=like&searchCriteria[filterGroups][0][filters][0][value]=%25CAT6-500&searchCriteria[filterGroups][0][filters][1][field]=sku&searchCriteria[filterGroups][0][filters][1][conditionType]=like&searchCriteria[filterGroups][0][filters][1][value]=%25CAT6-1000&searchCriteria[filterGroups][0][filters][2][field]=sku&searchCriteria[filterGroups][0][filters][2][value]=C208&searchCriteria[filterGroups][0][filters][3][field]=sku&searchCriteria[filterGroups][0][filters][3][value]=VDV226-011-SEN';
        fetch(getSelfMadeCables_url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + bearerToken
            }
        }).then(response => {
            response.json().then(data => {
                console.log(data.items);
                setSelfMadeProducts(data.items);
            })
        })

        // Get Hard Drives from Magento API
        const getHardDrives_url = 'https://morning-anchorage-80357.herokuapp.com/https://backstreet-surveillance.com/rest/default/V1/products?searchCriteria[filterGroups][0][filters][0][field]=sku&searchCriteria[filterGroups][0][filters][0][conditionType]=like&searchCriteria[filterGroups][0][filters][0][value]=%25T-HD'
        fetch(getHardDrives_url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + bearerToken
            }
        }).then(response => {
            response.json().then(data => {
                data.items.sort((a, b) => (a.price - b.price));
                setHardDrives(data.items);
                console.log(data.items);
            })
        })

        // Get Monitor products
        const getMonitors_url = 'https://morning-anchorage-80357.herokuapp.com/https://backstreet-surveillance.com/rest/default/V1/products?searchCriteria[filterGroups][0][filters][0][field]=sku&searchCriteria[filterGroups][0][filters][0][conditionType]=like&searchCriteria[filterGroups][0][filters][0][value]=MON%25&searchCriteria[filterGroups][0][filters][1][field]=sku&searchCriteria[filterGroups][0][filters][1][conditionType]=equals&searchCriteria[filterGroups][0][filters][1][value]=HDMI-Cable'
        fetch(getMonitors_url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + bearerToken
            }
        }).then(response => {
            response.json().then(data => {
                data.items.sort((a, b) => (a.price - b.price));
                setMonitorProducts(data.items);
                console.log(data.items);
            })
        })

        // Get Mounts
        const getMounts_url = 'https://morning-anchorage-80357.herokuapp.com/https://backstreet-surveillance.com/rest/default/V1/products?searchCriteria[filterGroups][0][filters][0][field]=category_bullet_points&searchCriteria[filterGroups][0][filters][0][value]=%25Mounting %25for:%25&searchCriteria[filterGroups][0][filters][0][conditionType]=like&searchCriteria[filterGroups][0][filters][1][field]=name&searchCriteria[filterGroups][0][filters][1][value]=M5%25 Universal Mount&searchCriteria[filterGroups][0][filters][1][conditionType]=like'
        fetch(getMounts_url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + bearerToken
            }
        }).then(response => {
            response.json().then(data => {
                setMountProducts(data.items);
                console.log(data.items);
            })
        })

        // Get POE products
        const getPOEs_url = 'https://morning-anchorage-80357.herokuapp.com/https://backstreet-surveillance.com/rest/default/V1/products?searchCriteria[filterGroups][0][filters][0][field]=sku&searchCriteria[filterGroups][0][filters][0][conditionType]=like&searchCriteria[filterGroups][0][filters][0][value]=%25POE-1%25'
        fetch(getPOEs_url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + bearerToken
            }
        }).then(response => {
            response.json().then(data => {
                data.items.sort((a, b) => (a.price - b.price));
                setPowerInjectors(data.items);
                console.log(data.items);
            })
        })
    }, [])

    // Update subtotal when product selections change
    useEffect(() => {
        updateSubtotal();
    }, [cameras, selectedNVR, selectedHardDrives, cablesType, selectedSMProducts, selectedPowerInjectors, selectedMonitor, isInstallationSelected])

    // Allow user to click next when selections are made
    useEffect(() => {
        switch(currentStep) {
            case 1:
                setCanClickNext(homeOrBusiness);
                break;
            case 2:
                setCanClickNext(true);
                break;
            case 3:
                setCanClickNext(cameras.length != 0);
                break;
            case 4: 
                setCanClickNext(selectedNVR);
                break;
            case 5:
                setCanClickNext(selectedHardDrives.length != 0);
                break;
            case 6:
                setCanClickNext(cablesType);
                break;
            case 7: 
                if(cablesType == 'self-made') {
                    setCanClickNext(selectedSMProducts.length != 0);
                }
                if(cablesType == 'pre-made') {
                    let cables = 0;
                    cameras.forEach(camera => {if(camera?.cable) cables++});
                    setCanClickNext(cables + 1 == cameras.length + 1)
                }
                if(cablesType == 'none') {
                    setCanClickNext(true);
                }
                break;
            case 8:
                if(cablesType != 'none') {
                    setCanClickNext(true);
                } else {
                    setCanClickNext(isInstallationSelected != null)
                }
                break;
            case 9:
                if(cablesType != 'none') setCanClickNext(isInstallationSelected != null);

        }
    }, [currentStep, homeOrBusiness, cameras, selectedNVR, selectedHardDrives, cablesType, selectedSMProducts, selectedPowerInjectors, selectedMonitor, isInstallationSelected])

    const updateSubtotal = () => {
        let price_subtotal = 0.00;
        // Add cameras, cables and mounts cost
        cameras.forEach(camera => {
            price_subtotal = price_subtotal + parseFloat(camera.price.$numberDecimal)
            price_subtotal = price_subtotal + parseFloat((camera.cable?.price ? camera.cable.price : 0));
            price_subtotal = price_subtotal + parseFloat((camera.mount?.price ? camera.mount.price : 0));
        })

        // Add NVR cost
        if(selectedNVR != '') price_subtotal = price_subtotal + parseFloat(selectedNVR?.price.$numberDecimal);
        if(selectedNVR?.cable) price_subtotal = price_subtotal + parseFloat(selectedNVR.cable.price);

        selectedHardDrives.forEach(hardDrive => {
            price_subtotal = price_subtotal + parseFloat((hardDrive?.price ? hardDrive.price : 0));
        })

        // Add self-made products costs
        if(cablesType == 'self-made') {
            selectedSMProducts.forEach(product => {
                price_subtotal = price_subtotal + (product.price * product.quantity);
            })
        }

        // Add Monitor Costs
        if(selectedMonitor != '') {
            price_subtotal = price_subtotal + selectedMonitor.price;
            if(selectedMonitor?.cable) {
                price_subtotal = price_subtotal + selectedMonitor.cable.price;
            }
        }

        // Add POE costs
        if(selectedPowerInjectors.length != 0) {
            selectedPowerInjectors.forEach(product => {
                console.log(product);
                price_subtotal = price_subtotal + parseFloat(product.price * product.quantity);
            })
        }

        // Add Installation Costs
        if(isInstallationSelected){
            price_subtotal = price_subtotal + parseFloat((homeOrBusiness == 'home' ? 299 : 349) + (cameras.length * 212.50))
        }

        setSubtotal(price_subtotal);
        console.log('subtotal useEffect ran. Subtotal: ' + price_subtotal);
    }


    const nextStep = () => {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
    }

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
        window.scrollTo(0, 0);
    }

    const enableStep = (step) => {
        let temp_steps = steps;
        temp_steps[step - 1].isDisabled = false;
        setSteps(temp_steps);
    }

    const selectNewCamera = (camera) => {
        let cameras_copy = cameras.slice();
        cameras_copy.push(camera);
        setCameras(cameras_copy);
        submitNotification('addedToCart', camera.sku);
        if(isInstallationSelected) submitNotification('installationUpdated');
    }

    const deleteCamera = index => {
        let removedCamera = cameras[index];
        let new_cameras = cameras.slice();
        new_cameras.splice(index, 1);
        setCameras(new_cameras);
        submitNotification('deletedFromCart', removedCamera?.sku);
        if(isInstallationSelected) submitNotification('installationUpdated');
    }

    const updateCameraName = (index, camera) => {
        let new_cameras = cameras.slice();
        new_cameras[index].cameraName = camera;
        setCameras(new_cameras);
    }

    const selectNVR = nvr => {
        setSelectedNVR(nvr);
        submitNotification('addedToCart', nvr.sku);
    }

    const selectCable = (cable, camera, nvr) => {
        if(camera){
            let index = cameras.find(product => camera.cameraName == product.cameraName);
            let cameras_copy = cameras.slice();
            let modified_camera = camera;
            modified_camera.cable = cable;
            cameras_copy[index] = modified_camera;
            setCameras(cameras_copy);
            submitNotification('addedToCart', cable.sku);
        }

        if(nvr) {
            nvr.cable = cable;
           setSelectedNVR(nvr); 
           updateSubtotal();
           submitNotification('addedToCart', cable.sku);
        }
    }

    const deleteCable = (camera, nvr) => {
        if(camera) {
            let index = cameras.find(product => camera.cameraName == product.cameraName);
            let cameras_copy = cameras.slice();
            let modified_camera = camera;
            let deletedCable = modified_camera.cable;

            modified_camera.cable = null;
            cameras_copy[index] = modified_camera;
            setCameras(cameras_copy);

            submitNotification('deletedFromCart', deletedCable.sku);
        }

        if(nvr) {
            let deletedCable = nvr.cable;
            nvr.cable = null;
            setSelectedNVR(nvr);
            updateSubtotal();

            submitNotification('deletedFromCart', deletedCable.sku);
        }
    }

    const addHardDrive = hardDrive => {
        let new_selectedHardDrives = selectedHardDrives.slice();
        new_selectedHardDrives.push(hardDrive);
        setSelectedHardDrives(new_selectedHardDrives);
        submitNotification('addedToCart', hardDrive.sku);
    }

    const deleteHardDrive = index => {
        let removedHD = selectedHardDrives[index];
        let new_HardDrives = selectedHardDrives.slice();
        new_HardDrives.splice(index, 1);
        setSelectedHardDrives(new_HardDrives);
        submitNotification('deletedFromCart', removedHD?.sku);
    }

    const selectCablesType = type => {
        setCablesType(type);

        if(selectedSMProducts.length != 0 || cameras[0]?.cable) {
            submitNotification('cartUpdated');
        }
        
    }

    const selectSMProducts = product => { 
        // I can't figure out why refetching base products fixes the problem    
        const getSelfMadeCables_url = 'https://morning-anchorage-80357.herokuapp.com/https://backstreet-surveillance.com/rest/default/V1/products?searchCriteria[filterGroups][0][filters][0][field]=sku&searchCriteria[filterGroups][0][filters][0][conditionType]=like&searchCriteria[filterGroups][0][filters][0][value]=%25CAT6-500&searchCriteria[filterGroups][0][filters][1][field]=sku&searchCriteria[filterGroups][0][filters][1][conditionType]=like&searchCriteria[filterGroups][0][filters][1][value]=%25CAT6-1000&searchCriteria[filterGroups][0][filters][2][field]=sku&searchCriteria[filterGroups][0][filters][2][value]=C208&searchCriteria[filterGroups][0][filters][3][field]=sku&searchCriteria[filterGroups][0][filters][3][value]=VDV226-011-SEN';
        fetch(getSelfMadeCables_url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + bearerToken
            }
        }).then(response => {
            response.json().then(data => {
                console.log(data.items);
                setSelfMadeProducts(data.items);
            })
        })
        
        // Check if product is already in cart to just increment qty
        let isProductInCart = false; 
        selectedSMProducts.forEach(item => {
            if(item.sku == product.sku) isProductInCart = true;
        })
        if(isProductInCart){
            let new_SMProducts = selectedSMProducts.slice();
            let index = new_SMProducts.findIndex(item => item.sku == product.sku);
            new_SMProducts[index].quantity = new_SMProducts[index].quantity + parseInt(product.quantity);
            setSelectedSMProducts(new_SMProducts);
        } else {
            let new_SMProducts = selectedSMProducts.slice();
            new_SMProducts.push(product);
            setSelectedSMProducts(new_SMProducts);
        }

        if(product.quantity > 1) submitNotification('addedToCartMultiple', parseInt(product.quantity) + 'x ' + product.sku);
        if(product.quantity == 1) submitNotification('addedToCart', product.sku);
    }
    
    const deleteSMProduct = index => {
        let removedSMProduct = selectedSMProducts[index];
        let new_SMProducts = selectedSMProducts.slice();
        new_SMProducts.splice(index, 1);
        setSelectedSMProducts(new_SMProducts);
        submitNotification('deletedFromCart', removedSMProduct?.sku);
    }

    const updateSMProductQuantity = (index, quantity) => {
        let new_SMProducts = selectedSMProducts.slice();
        new_SMProducts[index].quantity = quantity;
        setSelectedSMProducts(new_SMProducts);
        submitNotification('cartUpdated');
    }

    const addMount = (index, mount) => {
        let new_cameras = cameras.slice();
        new_cameras[index].mount = mount;
        setCameras(new_cameras);
        submitNotification('addedToCart', mount.sku);
    }

    const deleteMount = (index) => {
        let removedMount = cameras[index].mount;
        let new_cameras = cameras.slice();
        new_cameras[index].mount = null;
        setCameras(new_cameras);
        submitNotification('deletedFromCart', removedMount.sku);
    }

    const addMonitor = product => {
        // if there is a monitor with a cable, keep the cable
        if(selectedMonitor?.cable){
            product.cable = selectedMonitor.cable;
        }

        setSelectedMonitor(product);
        submitNotification('addedToCart', product.sku);
    }

    const addHDMI = product => {
        let new_monitor = JSON.parse(JSON.stringify(selectedMonitor));
        new_monitor.cable = product;
        setSelectedMonitor(new_monitor)
        submitNotification('addedToCart', product.sku);
    }

    const deleteMonitor = () => {
        let removed_monitor = selectedMonitor;
        setSelectedMonitor('');
        submitNotification('deletedFromCart', removed_monitor.sku);
    }

    const deleteHDMI = () => {
        let removed_cable = selectedMonitor.cable;
        let new_monitor = JSON.parse(JSON.stringify(selectedMonitor));
        new_monitor.cable = null;
        setSelectedMonitor(new_monitor);
        submitNotification('deletedFromCart', removed_cable.sku);
    }

    const addPowerInjector = (product) => {
        let new_POEs = selectedPowerInjectors.slice();

        let index = new_POEs.findIndex(poe => poe.sku == product.sku)
        console.log(index);

        if(index == -1){
            product.quantity = 1;
            new_POEs.push(product);
            setSelectedPowerInjectors(new_POEs);
        } else {
            new_POEs[index].quantity = new_POEs[index].quantity + 1;
            setSelectedPowerInjectors(new_POEs);
        }

        submitNotification('addedToCart', product.sku);
    }

    const deletePowerInjector = index => {
        let deletedPOE = selectedPowerInjectors[index];
        let new_POEs = selectedPowerInjectors.slice();
        new_POEs.splice(index, 1);
        setSelectedPowerInjectors(new_POEs);
        submitNotification('deletedFromCart', deletedPOE.sku);
    }

    const addInstallation = (installation) => {
        if(!installation && isInstallationSelected) submitNotification('deletedFromCart', 'Installation');
        if(installation && !isInstallationSelected) submitNotification('addedToCart', `Installation`);

        setIsInstallationSelected(installation);
    }

    const submitNotification = (type, payload) => {
        switch(type) {
            case 'addedToCart':
                store.addNotification({
                    title: 'Item added',
                    message: payload + " has been added to cart",
                    type: "success",
                    insert: "top",
                    container: "top-center",
                    animationIn: ["fade-in"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 4000,
                      onScreen: false
                    }
                  });
                  break;
            case 'addedToCartMultiple':
            store.addNotification({
                title: 'Items added',
                message: payload + " were added to cart",
                type: "success",
                insert: "top",
                container: "top-center",
                animationIn: ["fade-in"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 4000,
                    onScreen: false
                }
                });
                break;
            case 'deletedFromCart':
                store.addNotification({
                    title: 'Item deleted',
                    message: payload + " has been removed from cart",
                    type: "danger",
                    insert: "top",
                    container: "top-center",
                    animationIn: ["fade-in"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 4000,
                      onScreen: false
                    }
                  });
                break;
            case 'cartUpdated':
                store.addNotification({
                    title: 'Cart updated',
                    message: "Your cart has been updated",
                    type: "info",
                    insert: "top",
                    container: "top-center",
                    animationIn: ["fade-in"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 4000,
                      onScreen: false
                    }
                  });
                break;
            case 'installationUpdated':
                store.addNotification({
                    title: 'Cart Updated',
                    message: 'Your installation fees have been updated',
                    type: 'info',
                    insert: 'top',
                    container: 'top-center',
                    animationIn: ['fade-in'],
                    animationOut: ['animate__animated', 'animate__fadeOut'],
                    dismiss: {
                        duration: 4000,
                        onScreen: false
                    }
                });
                break;
        }
    }

    const goToCameras = () => {
        setCurrentStep(3)
    }

    const goToInstallation = () => {
        if(cablesType == 'pre-made') setCurrentStep(9)
        if(cablesType != 'pre-made') setCurrentStep(8)
    }

    const goToStep = (step) => {
        switch(step){
            case 'cameras':
                setCurrentStep(3);
                break;
            case 'NVR':
                setCurrentStep(4);
                break;
            case 'hard drives':
                setCurrentStep(5);
                break;
            case 'cables':
                setCurrentStep(7);
                break;
            case 'addons':
                if(cablesType == 'pre-made') setCurrentStep(8);
                if(cablesType != 'pre-made') setCurrentStep(7);
                break;
            case 'installation':
                if(cablesType == 'pre-made') setCurrentStep(9);
                if(cablesType != 'pre-made') setCurrentStep(8);
                break;
        }
    }

    const isLastStep = () => {
        if(cablesType == 'none'){
            console.log('I am called')
            return (currentStep == 9)
        } else {
            console.log('I am called')
            return (currentStep == 10)
        }
    }

    return(
        <div transition-style="fade:in" className="relative">
            <ReactNotification />
            <ProgressBar progress={(cablesType != 'none' ? currentStep / 10 : currentStep / 9)} />
            <main className="flex flex-row justify-center items-start mt-14 z-20">
                <div className="relative flex flex-col justify-center 2xl:w-8/12 xl:w-10/12 lg:w-10/12 md:w-11/12">
                    <Question currentStep={currentStep} cablesType={cablesType} />
                    <hr className="mt-5"/>
                    <div className="pb-44">
                        <Answer 
                            currentStep={currentStep}
                            enableStep={enableStep}
                            cameras={cameras} 
                            homeOrBusiness={homeOrBusiness} 
                            setHomeOrBusiness={setHomeOrBusiness}
                            allProducts={allProducts}
                            indoorCables={indoorCables}
                            outdoorCables={outdoorCables}
                            selfMadeProducts={selfMadeProducts}
                            videoRecorders={videoRecorders}
                            hardDrives={hardDrives}
                            selectNewCamera={selectNewCamera}
                            deleteCamera={deleteCamera}
                            updateCameraName={updateCameraName}
                            selectedNVR={selectedNVR}
                            selectNVR={selectNVR}
                            selectedHardDrives={selectedHardDrives}
                            addHardDrive={addHardDrive}
                            deleteHardDrive={deleteHardDrive}
                            cablesType={cablesType}
                            selectCablesType={selectCablesType}
                            selectCable={selectCable}
                            deleteCable={deleteCable}
                            selectSMProducts={selectSMProducts}
                            selectedSMProducts={selectedSMProducts}
                            deleteSMProduct={deleteSMProduct}
                            updateSMProductQuantity={updateSMProductQuantity}
                            monitorProducts={monitorProducts}
                            mountProducts={mountProducts}
                            powerInjectors={powerInjectors}
                            addMonitor={addMonitor}
                            addHDMI={addHDMI}
                            addMount={addMount}
                            deleteMount={deleteMount}
                            selectedMonitor={selectedMonitor}
                            deleteHDMI={deleteHDMI}
                            deleteMonitor={deleteMonitor}
                            selectedPowerInjectors={selectedPowerInjectors}
                            addPowerInjector={addPowerInjector}
                            deletePowerInjector={deletePowerInjector}
                            isInstallationSelected={isInstallationSelected}
                            addInstallation={addInstallation}
                            subtotal={subtotal}
                            goToStep={goToStep}
                        />
                    </div>

                    <div className="fixed bottom-0 pb-10 left-0 w-screen flex flex-col items-center mt-10 bg-white">
                        <div className="flex relative flex-col justify-center 2xl:w-8/12 xl:w-9/12 lg:w-10/12 md:w-11/12">
                            <Actions nextStep={nextStep} prevStep={prevStep} currentStep={currentStep} canClickNext={canClickNext} setCanClickNext={setCanClickNext} isLastStep={isLastStep}/>
                            <div className="absolute top-0 left-0 mt-5" style={{height: '60px', width: '220px'}}> 
                                <div style={{maxWidth: '100%', height: '100%'}}>
                                    <Image
                                        src='/images/BS_logo.png'
                                        layout="fill"
                                        objectFit="contain"
                                        quality={100}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Cart 
                        cameras={cameras} 
                        selectedNVR={selectedNVR} 
                        selectedHardDrives={selectedHardDrives} 
                        subtotal={subtotal}
                        selectedSMProducts={selectedSMProducts}
                        cablesType={cablesType}
                        goToCameras={goToCameras}
                        selectedMonitor={selectedMonitor}
                        selectedPowerInjectors={selectedPowerInjectors}
                        isInstallationSelected={isInstallationSelected}
                        homeOrBusiness={homeOrBusiness}
                        goToStep={goToStep}
                    />
                </div>
            </main>
        </div>
        
    )
}