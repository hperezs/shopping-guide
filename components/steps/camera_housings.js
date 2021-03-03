import Image from 'next/image'
import { useEffect, useState } from 'react';
import Description from '../CameraHousing/description';

export default function CameraHousings() {
    const [ displayMoreInfo, setDisplayMoreInfo ] = useState(false);
    const [ housingSelected, setHousingSelected ] = useState('');

    useEffect(() => {
        if(!displayMoreInfo && housingSelected != '') {
            setDisplayMoreInfo(true);
        }
    }, [housingSelected])


    const selected = 'border-green-200 border-4 shadow-lg';

    return (
        <section className="my-10">
            <p className="ml-3 text-xl mb-14">There are 3 types of camera housings. Click on each one to see more information about them. When you are ready, click Next to start your selections. </p>
            <div className="flex flex-row justify-around items-center mt-5 mb-10">
                <div className={"p-4 text-center rounded border-black-200 "
                        + (housingSelected == 'dome' ? selected : 'border hover:shadow-lg hover:border-green-200')}
                    onClick={e => setHousingSelected('dome')}
                >
                    <Image src="/images/dome-style.png"
                        width={200}
                        height={144}/>
                    <h5 className="text-lg">Dome style</h5>
                </div>

                <div className={"p-4 text-center rounded border-black-200 "
                        + (housingSelected == 'bullet' ? selected : 'border hover:shadow-lg hover:border-green-200')}
                    onClick={e => setHousingSelected('bullet')}
                >
                    <Image src="/images/bullet-style.png"
                        width={200}
                        height={144}/>
                    <h5 className="text-lg">Bullet style
                    </h5>
                </div>

                <div className={"p-4 text-center rounded border-black-200 "
                        + (housingSelected == 'ptz' ? selected : 'border hover:shadow-lg hover:border-green-200')}
                    onClick={e => setHousingSelected('ptz')}
                >
                    <Image src="/images/ptz-style.png"
                        width={200}
                        height={144}/>
                    <h5 className="text-lg">PTZ style
                    </h5>
                </div>
            </div>
            <Description 
                displayMoreInfo={displayMoreInfo} 
                housingSelected={housingSelected}
            />
        </section>
    )
}
