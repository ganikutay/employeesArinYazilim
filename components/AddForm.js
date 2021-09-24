import { Form, Button } from 'react-bootstrap'
//react-bootstrap su ise yarar, bootstrap ozelliklerini component olarak olusturmamizi saglar.
//Boyle olusturdugumuzda da bootstrapin kendi js bagimliliklarindan kurtulmus oluyoruz.
import  {EmployeeContext} from '../contexts/EmployeeContext';
import { useContext, useState } from 'react';

const AddForm = () => {


//addEmployee metodunu, EmployeeContext inden cikartiyoruz. Iki adet metot vardi value={{employees, addEmployee}}, suanda addEmployee olani cikarttik.
const { addEmployee } = useContext(EmployeeContext);

//HER BIR DEGER AYRI STATE OLARAK 1. YONTEM
//Formumuzu calisir hale getirirken, her bir form elemanimizi ayri bir state olarak dusunuyoruz. 
//ve baslangic degeri olarak hepsine bos stringler verdik.
/* const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [address, setAddress] = useState("");
const [phone, setPhone] = useState(""); */


//TEK STATE OLARAK 2. YONTEM
const [newEmployee, setNewEmployee ] = useState({
    name:"",email:"",adress:"",phone:"" 
})

//newEmployee den aliyoruz, extract ettik********** BUNU TAM ANLAMIYORUM???
const {name,email,address,phone} = newEmployee; 

const oninputChange = (event) => {
    //burda herhangi bir degisiklik olursa, setNewEmployee metodunu calistir dedik.
    // once varsayilan durumunu al {...newEmployee} ardindan, [event.target.name]: degerini, event.target.value buradan alicaksin
    setNewEmployee({...newEmployee, [event.target.name]: event.target.value})
    //newEmployee nin baslangic durumu, tum ozellikleri bos string seklinde(...newEmployee)
}

const handleSubmit = (event) => {
    event.preventDefault(); // varsayilan submit i yok ediyoduk. refresh i...

    //setName,setEmail... ile name, email... 'e yeni degerleri atandi ve
    //yeni degerleri de addEmployee metoduna, parametre olarak gonderiyoruz.
    addEmployee(name,email,address,phone)

}


//name icin setName, email icin setEmail... yapiyoruz cunku her biri icin ayri ayri state olarak dusunduk
    return(
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Name *"

                    name="name"   //2. yontem-- burdaki name ozelligine gore asagidaki value lari birbirine esitleyecek

                    //burda girilen degeri, setName ile yeni deger olarak ata diyoruz
                    value={name} 
                    //ornek olarak: name bolumune gani girince, onChange calisir ve der ki setName bolumune Gani yazmissin, yani name in o anki bilgisi Gani olacak
                //1.yontem    onChange={event => setName(event.target.value)}

                    //2.yontem------   yani tiklandiginda hepsinde ayni fonksiyonu calistiricak.
                    onChange={event => oninputChange(event)}
                    required
                />
            </Form.Group>

            <Form.Group>
                <Form.Control
                    type="email"
                    placeholder="Email *"

                    name="email"   //2. yontem-- burdaki email ozelligine gore asagidaki value lari birbirine esitleyecek

                    //burda girilen degeri, setEmail ile yeni deger olarak ata diyoruz
                    value={email} 
                    //ornek olarak: email bolumune gani@hotmail.com girince, onChange calisir ve der ki setName bolumune gani@hotmail.com yazmissin, yani email in o anki bilgisi gani@hotmail.com olacak
                //1.yontem    onChange={event => setEmail(event.target.value)}

                    //2.yontem------   yani tiklandiginda hepsinde ayni fonksiyonu calistiricak.
                    onChange={event => oninputChange(event)}
                    required
                />
            </Form.Group>

            <Form.Group>
                <Form.Control
                    as="textarea"
                    placeholder="Address *"

                    name="address"   //2. yontem-- burdaki address ozelligine gore asagidaki value lari birbirine esitleyecek

                    //burda girilen degeri, setAdress ile yeni deger olarak ata diyoruz
                    value={address} 
                    //ornek olarak:  yukardaki bilgiler gibi....
                //1.yontem   onChange={event => setAddress(event.target.value)}


                    //2.yontem------   yani tiklandiginda hepsinde ayni fonksiyonu calistiricak.
                    onChange={event => oninputChange(event)}
                    rows={3} // 3 satirlik alan verdik
                />
            </Form.Group>

            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Phone"

                    name="phone"   //2. yontem-- burdaki phone ozelligine gore asagidaki value lari birbirine esitleyecek

                    value={phone} 
                    //ornek olarak: name bolumune gani girince, onChange calisir ve der ki setName bolumune Gani yazmissin, yani name in o adki bilgisi Gani olacak
                //1.yontem    onChange={event => setPhone(event.target.value)}

                //2.yontem------   yani tiklandiginda hepsinde ayni fonksiyonu calistiricak.
                onChange={event => oninputChange(event)}
                    />
            </Form.Group>

            {/* variant derken success olan class modeli gibi dusun, bootstrap 4 teki
            var olan yerin tamamini kapsasin diye submit verdik, yada block!???? */}
            <Button variant="success" type="submit" block>
                Add New Employee
            </Button>
        </Form>
    )
}


export default AddForm;