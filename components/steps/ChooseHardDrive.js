import Image from 'next/image'
import { useEffect, useState } from 'react';
import {backstreet_domain} from '../../lib/backstreet_domain'
import RecommendedHardDrive from './recommendedHardDrive';
import {FaRegWindowClose} from 'react-icons/fa'
import {FiPlus} from 'react-icons/fi'

export default function ChooseHardDrive({hardDrives, cameras, addHardDrive, selectedHardDrives, deleteHardDrive}){
    const [numberOfCameras, setNumberOfCameras] = useState(cameras.length);
    const [daysOfStorage, setDaysOfStorage] = useState(7);
    const [recordingType, setRecordingType] = useState('continuous');
    const [resolution, setResolution] = useState(5038848);
    const [fps, setFps] = useState(20);
    const [requiredStorage, setRequiredStorage] = useState('--');
    const [recommendedHD, setRecommendedHD] = useState('1T');
    const [additionalHD, setAdditionalHD] = useState('--');
    const [recommendedHDMultiplier, setRecommendedHDMultiplier] = useState(0);
    const [isChoosing, setIsChoosing] = useState(selectedHardDrives.length == 0);
    const [isEditing, setIsEditing] = useState(false);

    const FQA = 510;
    const KILOBYTE = 1000;

    // Calculate the required storage
    useEffect(() => {
        let colorPixelSize = (resolution < 824400 ? 16 : 30)
        let requiredBandwith = resolution * colorPixelSize * fps * numberOfCameras / FQA;
        let bytesTotal = requiredBandwith / 8 * 86400 * daysOfStorage;

        if (recordingType == 'motion') {
            bytesTotal = bytesTotal * 0.45;
        }

        let terabytes = (bytesTotal / (KILOBYTE * KILOBYTE * KILOBYTE * KILOBYTE)).toFixed(3);

        setRequiredStorage(terabytes);
    }, [numberOfCameras, daysOfStorage, recordingType, resolution, fps])

    // Change the recommended HD
    useEffect(() => {
        setRecommendedHDMultiplier(0);

        // hardDrives are always sorted by price, so accessing just by index is a shortcut (will see if it can go wrong)
        if(requiredStorage < 1.000) {
            setRecommendedHD(hardDrives[0]);
            setAdditionalHD('--');
        }
        if(requiredStorage > 0.999){
            setRecommendedHD(hardDrives[1]);
            setAdditionalHD('--');
        }
        if(requiredStorage > 1.999) {
            setRecommendedHD(hardDrives[2]);
            setAdditionalHD('--');
        }
        if(requiredStorage > 3.999) {
            setRecommendedHD(hardDrives[3]);
            setAdditionalHD('--');
        }
        if(requiredStorage > 7.999) {
            setRecommendedHD(hardDrives[4])
            setAdditionalHD('--');
        }
        if(requiredStorage > 9.999) {
            setRecommendedHD(hardDrives[4]);
            setAdditionalHD(hardDrives[0]);
        }
        if(requiredStorage > 10.999) {
            setRecommendedHD(hardDrives[4]);
            setAdditionalHD(hardDrives[1]);
        }
        if(requiredStorage > 11.999) {
            setRecommendedHD(hardDrives[4]);
            setAdditionalHD(hardDrives[2]);
        }
        if(requiredStorage > 13.999) {
            setRecommendedHD(hardDrives[4]);
            setAdditionalHD(hardDrives[3]);
        }
        if(requiredStorage > 17.999) {
            setRecommendedHD(hardDrives[4]);
            setRecommendedHDMultiplier(2);
            setAdditionalHD('--');
        }
        if(requiredStorage > 19.999) {
            
            let multiplier = Math.ceil(requiredStorage / 10) - 1;
            setRecommendedHDMultiplier(multiplier);
            setRecommendedHD(hardDrives[4]);
    
            let remainder = requiredStorage % 10;
    
            switch(true) {
                case remainder < 1:
                    setAdditionalHD(hardDrives[0]);
                    break;
                case remainder < 2: 
                    setAdditionalHD(hardDrives[1]);
                    break;
                case remainder < 4:
                    setAdditionalHD(hardDrives[2]);
                    break;
                case remainder < 8:
                    setAdditionalHD(hardDrives[3]);
                    break;
                case remainder < 10: 
                    setAdditionalHD('--')
                    setRecommendedHDMultiplier(multiplier + 1);
                    break;
            }
        }
    }, [requiredStorage])

    useEffect(() => {
            document.getElementById('#yourHardDrives')?.scrollIntoView();
    }, [isChoosing])

    const input_styles = "inline ml-3 rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 "
    const selectButton_styles = "px-5 py-1 border rounded bg-green-600 text-white text-sm uppercase tracking-wider font-semibold mt-3 transition hover:bg-green-400 focus:outline-none focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-500 ";

    const numberOfCameras_options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 24, 32, 48, 64];
    const daysOfStorage_options = [];
    for(let i = 1; i <= 30; i++) {
        daysOfStorage_options.push(i);
    }

    const fps_options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 30];

    const handleChanges = (event) => {
        let value = event.target.value;
        let name = event.target.name;

        switch(name) {
            case 'numberOfCameras':
                setNumberOfCameras(value);
                break;
            case 'daysOfStorage':
                setDaysOfStorage(value);
                break;
            case 'recordingType':
                setRecordingType(value);
                break;
            case 'resolution':
                setResolution(value);
                break;
            case 'fps':
                setFps(value);
                break;
        }
    }

    const addToCart = hardDrive => {
        setIsChoosing(false);
        addHardDrive(hardDrive)
    }

    const handleDelete = index => {
        deleteHardDrive(index); 
        setIsEditing(false); 
        console.log(selectedHardDrives);
        if(selectedHardDrives.length == 1) {
            console.log('length is 0.')
            setIsChoosing(true);
        }
    }

    return(
        <section className="my-10">
            <p className="text-lg">The size of the recommended Hard Drive varies according to your recording set-up. Choose between the following options to find the Hard Drive that best suits your needs.</p>

            {/* Calculator */}
            <div className="flex flex-row justify-center mt-10 transition-all duration-300 ease">
                <div style={{width: '380px'}} className="flex flex-col border border-gray-300 rounded p-10 mr-10 shadow">
                    <div className="flex justify-center mb-10">
                        <div className="flex flex-col items-center justify-center p-7 border border-gray-300 rounded">
                            <span className="text-xl">Required Storage Capacity</span>
                            <span className="text-2xl font-semibold mt-5">{requiredStorage} TB</span>
                        </div>
                    </div>
                    
                    <div className="flex flex-row justify-between mb-5 items-center">
                        <label>Number of cameras:</label>
                        <select
                            onChange={handleChanges} 
                            name="numberOfCameras"
                            value={numberOfCameras} 
                            className={input_styles}
                        >
                            {numberOfCameras_options.map((option, index) => {
                                return <option key={index}>{option}</option>
                            })}
                        </select>
                    </div>
                    
                    <div className="flex flex-row justify-between mb-5 items-center">
                        <label>Days of storage:</label>
                        <select
                            onChange={handleChanges} 
                            name="daysOfStorage" 
                            value={daysOfStorage}
                            className={input_styles}
                        >
                            {daysOfStorage_options.map((option, index) => {
                                return <option key={index}>{option}</option>
                            })}
                        </select>
                    </div>
                    <div className="flex flex-row justify-between mb-5 items-center">
                        <label>Recording:</label>
                        <select
                            onChange={handleChanges} 
                            name="recordingType"
                            value={recordingType}
                            className={input_styles}
                        >
                            <option value="continous">Continuous</option>
                            <option value="motion">On Motion only</option>
                        </select>
                    </div>
                    <div className="flex flex-row justify-between mb-5 items-center">
                        <label>Resolution:</label>
                        <select
                            onChange={handleChanges} 
                            name="resolution"
                            value={resolution}
                            className={input_styles}
                        >
                            <option value={8294400}>4K (8 Megapixel)</option>
                            <option value={5038848}>3K (5 Megapixel)</option>
                            <option value={4085760}>2K (4 Megapixel)</option>
                            <option value={2073600}>1K (2 Megapixel)</option>
                        </select>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <label>Frames Per Second (FPS):</label>
                        <select
                            onChange={handleChanges} 
                            name="fps"
                            value={fps}
                            className={input_styles}
                        >
                            {fps_options.map(number => {
                                return(<option key={number}>{number}</option>)
                            })}
                        </select>
                    </div>
                </div>

                <RecommendedHardDrive hardDrive={recommendedHD} additionalHD={additionalHD} recommendedHDMultiplier={recommendedHDMultiplier}/> 
            </div>

            {isChoosing &&
                <div className="flex justify-center mt-10">
                    <div
                        transition-style="in:wipe:right" 
                        className="flex flex-row justify-evenly items-center p-5 border rounded bg-gray-200 shadow">
                        {hardDrives && 
                            hardDrives.map((hardDrive, index) => {
                                let isRecommended = (hardDrive.sku == recommendedHD.sku || hardDrive.sku == additionalHD.sku);
                                return(
                                    <div className="flex flex-col items-center justify-center " key={index}>
                                        <div
                                            transition-style="fade:in" 
                                            className={"m-4 p-6 flex flex-col justify-center bg-white shadow-xl items-center rounded " + (isRecommended ? 'border-2 border-green-300' : 'border border-gray-300')}>
                                            <div style={{height: '86px', width: '120px'}}> 
                                                <div style={{position: 'relative', maxWidth: '100%', height: '100%'}}>
                                                    <Image
                                                        src={'/images/hard_drive_hero.jpg'}
                                                        layout="fill"
                                                        objectFit="contain"
                                                        quality={100}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center justify-center mt-5">
                                                <p>{hardDrive.name}</p>
                                                <p className="font-light">{hardDrive.sku}</p>
                                                <p className="text-green-600">${hardDrive.price.toFixed(2)}</p>
                                                <button onClick={e => addToCart(hardDrive)} className={selectButton_styles}>Add to cart</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }

            {(!isChoosing && selectedHardDrives.length != 0) && 
                <div className="flex justify-center">
                    <div id="yourHardDrives" transition-style="in:square:center" className="flex flex-col items-center mt-10 p-5 shadow border border-gray-300 rounded">
                        <h4 className="font-light text-xl">Your Hard Drive(s):</h4>
                        <div className="flex justify-center">
                            {selectedHardDrives.map((hardDrive, index) => {
                                return(
                                    <div className="flex flex-col items-center justify-center " key={index}>
                                        <div
                                            transition-style="fade:in" 
                                            className="m-4 p-6 relative flex flex-col justify-center bg-white shadow-lg items-center rounded border border-gray-300">
                                            <div style={{height: '86px', width: '120px'}}> 
                                                <div style={{position: 'relative', maxWidth: '100%', height: '100%'}}>
                                                    <Image
                                                        src={'/images/hard_drive_hero.jpg'}
                                                        layout="fill"
                                                        objectFit="contain"
                                                        quality={100}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center justify-center mt-5">
                                                <p>{hardDrive.name}</p>
                                                <p className="font-light">{hardDrive.sku}</p>
                                                <p className="text-green-600">${hardDrive.price.toFixed(2)}</p>
                                            </div>
                                            <span 
                                                onClick={e => handleDelete(index)}
                                                className={"absolute top-0 right-0 cursor-pointer p-2 " + (!isEditing ? 'hidden' : '') }
                                            >
                                                <FaRegWindowClose className="fill-current text-red-600 text-xl hover:text-red-400"/>
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                            {isEditing && 
                                <div
                                    transition-style="fade:in" 
                                    className="m-4 p-6 flex flex-col justify-center bg-white shadow-lg items-center rounded border border-gray-300 cursor-pointer hover:shadow-xl hover:border-green-500"
                                    onClick={e => {setIsChoosing(true); setIsEditing(false);}}
                                >
                                    <span className="text-5xl text-green-600 opacity-90"><FiPlus /></span>
                                    <p className="text-lg mt-7 text-green-600">Add a Hard Drive</p>
                                </div>
                            }
                        </div>
                        {!isEditing &&
                        <button 
                            onClick={e => setIsEditing(true)}
                            className="uppercase text-sm tracking-wide font-semibold text-green-600 border border-green-600 my-2 px-3 py-2 rounded hover:text-white hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200 focus:ring-opacity-500">
                            Change
                        </button>}
                        {isEditing &&
                        <button 
                            onClick={e => setIsEditing(false)}
                            className="uppercase text-sm tracking-wide font-semibold text-red-600 border border-red-600 my-2 px-3 py-2 rounded hover:text-white hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-500">
                            Cancel
                        </button>}
                    </div>
                </div>
            }
        </section>
    )
}