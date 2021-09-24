import { Form, Button } from 'react-bootstrap'
//react-bootstrap su ise yarar, bootstrap ozelliklerini component olarak olusturmamizi saglar.
//Boyle olusturdugumuzda da bootstrapin kendi js bagimliliklarindan kurtulmus oluyoruz.
import { EmployeeContext } from '../contexts/EmployeeContext';
import { useContext, useState } from 'react';


//theEmployee , Employee.js te yakalamistik. Yani aslinda Employee.js den EditForm.js ye bi tane prop gonderdik.
const EditForm = ({ theEmployee }) => {


    //updateEmployee metodunu, EmployeeContext inden cikartiyoruz. Iki adet metot vardi value={{employees, addEmployee}}, suanda addEmployee olani cikarttik.
    const { updateEmployee } = useContext(EmployeeContext);

    const employee = theEmployee; // burda sadece degisken atamasi yaptik, theEmployee olarakta kullanabilirdik.
    const id = employee.id; // bana bunun id si lazimdi, id yi guncellenmis calisan bilgisinde kullanacagim(updatedEmployee'de)

//Asagidaki isimleri duzenle butonuna tiklayinca, modal acildiginda varsayilan ozelliklerini gormek  icin yazdik.
    //HER BIR DEGER AYRI STATE OLARAK ALINACAK
    const [name, setName] = useState(employee.name);
    const [email, setEmail] = useState(employee.email);
    const [address, setAddress] = useState(employee.address);
    const [phone, setPhone] = useState(employee.phone);

//yeni calisan bilgilerrini olusturduk
    const updatedEmployee = { id, name, email, address, phone };
//ve ardindan bu bilgileri asagida updateEmployee ye yerlestirmis olduk. 

    const handleSubmit = (event) => {
        event.preventDefault(); //refresh i engelledik.

        //updateEmloyee nin 2 adet parametreye ihtiyaci vardi.
        updateEmployee(id,updatedEmployee);

    }


    //name icin setName, email icin setEmail... yapiyoruz cunku her biri icin ayri ayri state olarak dusunduk
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Name *"
                    name="name"
                    value={name}
                    //onchange yazmazsak, icerisinde degisiklik yapilmasina musade etmez.
                    onChange={(event)=>setName(event.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group>
                <Form.Control
                    type="email"
                    placeholder="Email *"
                    name="email"
                    value={email}
                    //onchange yazmazsak, icerisinde degisiklik yapilmasina musade etmez.
                    onChange={(event)=>setEmail(event.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group>
                <Form.Control
                    as="textarea"
                    placeholder="Address *"
                    name="address"
                    value={address}
                    //onchange yazmazsak, icerisinde degisiklik yapilmasina musade etmez.
                    onChange={(event)=>setAddress(event.target.value)}
                    rows={3} // 3 satirlik alan verdik
                />
            </Form.Group>

            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Phone"
                    name="phone"
                    value={phone}
                    //onchange yazmazsak, icerisinde degisiklik yapilmasina musade etmez.
                    onChange={(event)=>setPhone(event.target.value)}
                />
            </Form.Group>

            {/* variant derken success olan class modeli gibi dusun, bootstrap 4 teki
            var olan yerin tamamini kapsasin diye submit verdik, yada block!???? */}
            <Button variant="success" type="submit" block>
                Edit Employee
            </Button>
        </Form>
    )
}


export default EditForm;