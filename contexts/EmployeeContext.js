// CONTEXT = BAGLAM
//yani cesitli fonksiyonlarimizi, bilgilerimizi buradan chield componentlerre aktariyoruz

import { createContext, useState } from "react";
//import EmployeeList from "../components/EmployeeList";
import { v4 as uuidv4 } from 'uuid';


//burda EmployeeContext adinda bi Context olusturuyuruz.
export const EmployeeContext = createContext();


const EmployeeContextProvider = (props) => {
    //buranin icerisine paylasmak istedigimiz veriyi alicaz.

    //ilk parametre employees(veya kitaplar gibi), ikinci ise degisiklik yada birisine tiklama vb gibi
    //ilk eleman, o an ki bilgi yani state verir. Ikinci ise uzerinde degisiklik yapacagimiz islemlerin yeri
    const [employees, setEmployees] = useState([
        { id: uuidv4(), name: 'Thomas Hardy', email: 'thomashardy@mail.com', address: '89 Chiaroscuro Rd, Portland, USA', phone: '(171) 555-2222' },
        { id: uuidv4(), name: 'Dominique Perrier', email: 'dominiqueperrier@mail.com', address: 'Obere Str. 57, Berlin, Germany', phone: '(313) 555-5735' },
        { id: uuidv4(), name: 'Maria Anders', email: 'mariaanders@mail.com', address: '25, rue Lauriston, Paris, France', phone: '(503) 555-9931' },
        { id: uuidv4(), name: 'Fran Wilson', email: 'franwilson@mail.com', address: 'C/ Araquil, 67, Madrid, Spain', phone: '(204) 619-5731' },
        { id: uuidv4(), name: 'Martin Blank', email: 'martinblank@mail.com', address: 'Via Monte Bianco 34, Turin, Italy', phone: '(480) 631-2097' }
    ])


    //isimleri tek sayfada degilde, GENEL OLARAK siralamasi icin, istersen const sortedEmployees  olarak atama yapilabilir.
    employees.sort((a, b) => a.name.localeCompare(b.name))


    // ---------------YENI CALISAN OLURTURMA FONKSIYONU----------------------
//biz burada yeni bir eleman ekleme yapiyoruz, yani bu demek oluyor ki state degisecek yani setEmployees
    const addEmployee = (name, email, address, phone) => {
        //once ...employes yazarak, var olan employees imizi aliyoruz. Sonrasinda bunu degistiricez, ekleneceklerin bilgileri girildi.
        setEmployees([...employees, {id:uuidv4(), name:name, email:email, address:address, phone:phone }])
/*         veya kestirme olarak es6 da direkt name, address, phone olarakta yazabiliriz. Bilgilerin nereden gelecegini yazdik.
 */    }

//silecegimiz butonun hangi calisan oldugunu bilmemiz icin, parametre olarak id aliyoruz.
const deleteEmployee = (id) => {
    setEmployees(employees.filter( (employee) => employee.id !== id))
    //burada dedikki filter metodu ile: her bir employee yi filtreye soktuk ve employee.id !=== id derken: 
    //employee.id nin parametre olarak verilen id ye esit olmadiklarinin donmesini istiyoruz.
    // Yani sectigimiz id filtre disinda kalacak, digerleri eklenip yeni bir array olusturarcak.
    //Simdi bu function i <EmployeeContext.Provider icine ekliyoruz ki, farkli componentlerden cagirinca erisebilelim..
}

//bize iki adet bilgi lazim. 1 guncellenecek kisi bilgisi(id). 2 guncellendikten sonraki hali(updatedEmployee). 
const updateEmployee = (id,updatedEmployee) => {
    setEmployees(employees.map((employee) => (employee.id === id ? updatedEmployee : employee)))
    //once tum calisanlara map metodu uyguladik. Cunku degisikligin oldugu employee yi bulucaz.
    //sira sira employee bilgileri ve id ler geliyor,
    //employee.id === id     , eger sirasi gelen employee mizin id si secilenin id sine esitse,
    //updatedEmployee , employee ye aktarilacak ve guncellenmis olacak.
    //Programin calisma mantigi bu!!!
}



//                  Provider ile gonderiyoruz.
    return (                 //PROPS olarak paylasiyoruz!! YANI ASLINDA BUNLARI EXPORT EDIYORUZ, disarda kullanmak icin! 
        <EmployeeContext.Provider value={{employees, addEmployee, deleteEmployee, updateEmployee}}> 
            {/* childrenlara gonderiyoruz , tabi yukarda parametre(arguman) olarak propsu aliyoruz*/}
            {props.children} 

        </EmployeeContext.Provider>
    )
}


export default EmployeeContextProvider; 






//biz fonksiyonlarimizi context in icerisinde olusturuyoruz, sonra kullanacagimiz componentlarda, o context vasitasiyla cagiriyoruz