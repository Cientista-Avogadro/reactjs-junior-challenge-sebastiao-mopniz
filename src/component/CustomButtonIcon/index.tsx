import {
    Box,
    Button, Checkbox, FormControl, GridItem, Input,
    Modal, ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Textarea,
    useDisclosure, useToast
} from "@chakra-ui/react";
import React, {useState} from "react";
import {IClientsProps} from "../../types/apiResult";
import {IconType} from "react-icons";
import {v4 as uuidv4} from "uuid";
import {createNewClient, editClient} from "../../helpers/crudOperator";
import {useForm} from "react-hook-form";
import {FileContainer, FileInput, Image, LoadImage} from "./CustomButton";
import {BiImageAdd} from "react-icons/all";
import {useDispatch, useSelector} from "react-redux";
import {IinitialProps} from "../../redux/store";

interface ICustomButtonProps{
    props?:any
    Icon:IconType
    type:'add'|'edit'
    dataClient?:IClientsProps
}

export  const CustomButtonIcon = ({Icon, type, dataClient}:ICustomButtonProps)=>{
    const dispatch = useDispatch();
    const [getImage, setImage] = useState('');
    const [checked, setChecked] = useState(dataClient?.isActive);
    const { register, handleSubmit } = useForm();
    const { register:registerEdited, handleSubmit:handleSubmitEdited} = useForm();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const onImageChange = (event:any) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    };
    const {theme } = useSelector((state: IinitialProps) => state);



    const onSubmit = (data:any) => {
        createNewClient({...data, isActive: true,id:uuidv4()}).then(res=>console.log(res))
        onClose()
        toast({
            title: 'Cliente Criado com Sucesso.',
            description: "Nós Criamos uma conta para você.",
            status: 'success',
            duration: 5000,
            isClosable: true,
        })
    };

    const onSubmitEdited = (data:any) => {
        dataClient && editClient(dataClient?.id, {...data, image:getImage, isActive:checked})
        dispatch({ type: 'set', image:getImage||''})
        onClose()
        toast({
            title: 'Cliente Editado com Sucesso.',
            description: "Nós Editamos seus seus.",
            status: 'success',
            duration: 5000,
            isClosable: true,
        })
    };





    return (
            type ==='add' ?
            <>
                <Box style={{
                    backgroundColor: '#4299E1',
                    width:'50px',
                    height:'50px',
                    fontSize: '12px',
                    display:'grid',
                    placeItems:'center',
                    borderRadius:'5px',
                    cursor:'pointer'
                }}>
                    <Icon onClick={onOpen} style={{
                        fontSize: '28px',
                        color:'#fff'
                    }}/>
                </Box>

                <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={isOpen}
                    onClose={onClose}
                    size={'xl'}
                >
                    <ModalOverlay />
                    <ModalContent bgColor={theme!=='white' ? 'black':'white'}>
                        <ModalHeader color={theme=='white' ? 'black':'white'} textAlign={'center'} borderBottom={'1px solid '.concat(theme=='white' ? 'black':'white')} w={'100%'} mb={'20px'}>Dados do Cliente</ModalHeader>

                        <ModalBody
                        >
                            <form onSubmit={handleSubmit(onSubmit)}
                                  style={{
                                      paddingBottom:6,
                                      display: 'grid',
                                      gridTemplateColumns:'repeat(2, 1fr)',
                                      gap:'20px',
                                  }}
                            >
                                <GridItem>
                                    <FormControl>
                                        <Input  placeholder='Nome' isRequired  {...register("name")} borderColor={theme=='white' ? 'black':'white'} _placeholder={{color:theme==='white' ? 'black':'rgba(255,255,255,0.2)' }} color={theme==='white' ? 'black':'white'}/>
                                    </FormControl>
                                </GridItem>

                                <GridItem>
                                    <FormControl>
                                        <Input placeholder='Empresa' {...register("company")} borderColor={theme=='white' ? 'black':'white'} _placeholder={{color:theme==='white' ? 'black':'rgba(255,255,255,0.2)' }} color={theme==='white' ? 'black':'white'}/>
                                    </FormControl>
                                </GridItem>

                                <GridItem>
                                    <FormControl >
                                        <Input  placeholder='Telefone' {...register("phone")} borderColor={theme=='white' ? 'black':'white'} _placeholder={{color:theme==='white' ? 'black':'rgba(255,255,255,0.2)' }} color={theme==='white' ? 'black':'white'}/>
                                    </FormControl>
                                </GridItem>

                                <GridItem>
                                    <FormControl >
                                        <Input placeholder='Email' type={'email'} {...register("email")} isRequired borderColor={theme=='white' ? 'black':'white'} _placeholder={{color:theme==='white' ? 'black':'rgba(255,255,255,0.2)' }} color={theme==='white' ? 'black':'white'}/>
                                    </FormControl>
                                </GridItem>

                                <GridItem colSpan={2}>
                                    <FormControl >
                                        <Input  placeholder='address' {...register("address")} borderColor={theme=='white' ? 'black':'white'} _placeholder={{color:theme==='white' ? 'black':'rgba(255,255,255,0.2)' }} color={theme==='white' ? 'black':'white'}/>
                                    </FormControl>
                                </GridItem>

                                <GridItem colSpan={2} >
                                    <FormControl  >
                                        <Textarea  placeholder='Notas'  {...register("note")} borderColor={theme=='white' ? 'black':'white'} _placeholder={{color:theme==='white' ? 'black':'rgba(255,255,255,0.2)' }} color={theme==='white' ? 'black':'white'}/>
                                    </FormControl>
                                </GridItem>


                                <GridItem colSpan={2} display={'flex'} justifyContent={'center'}>
                                    <Button bgColor='blue' mr={3}  type={'submit'} color={'#fff'} _active={{backgroundColor: ''}} _hover={{transform:'scale(1.1)'}}>
                                        Criar
                                    </Button>
                                    <Button onClick={onClose} bgColor={'red'} color={'#fff'} _active={{backgroundColor: ''}} _hover={{transform:'scale(1.1)'}}>Cancelar</Button>
                                </GridItem>
                            </form>

                        </ModalBody>
                    </ModalContent>
                </Modal>
            </>
            :
            <>
                <Icon onClick={onOpen} color={theme!=='white' ? 'black':'white'}/>
                <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={isOpen}
                    onClose={onClose}
                    size={'xl'}
                >
                    <ModalOverlay />
                    <ModalContent bgColor={theme!=='white' ? 'black':'white'}>
                        <ModalHeader
                            textAlign={'center'}
                            borderBottom={'1px solid '.concat(theme=='white' ? 'black':'white')}
                            color={theme=='white' ? 'black':'white'}
                            w={'100%'}
                            mb={'20px'}>Dados do Cliente</ModalHeader>
                        <ModalBody
                        >
                            <LoadImage >
                                <Image src={dataClient?.image || ''} style={{
                                    border: '1px solid '.concat(theme=='white' ? 'black':'white')
                                }}/>
                                <FileContainer style={{
                                    backgroundColor: theme=='white' ? 'black':'white'
                                }}>
                                    <label htmlFor="photo" style={{color:theme!=='white' ? 'black':'white'}}>
                                        <BiImageAdd color={theme!=='white' ? 'black':'white'}/>
                                        Carregar...
                                    </label>
                                    <FileInput
                                        type="file"
                                        onChange={onImageChange}
                                        accept="image/jpg,image/png,image/jpeg,image/svg,image/gif"
                                        id="photo"
                                    />
                                </FileContainer>
                            </LoadImage>
                            <form onSubmit={handleSubmitEdited(onSubmitEdited)} style={{
                                paddingBottom:6,
                                display: 'grid',
                                gridTemplateColumns:'repeat(2, 1fr)',
                                gap:'20px'
                            }}>
                                <GridItem>
                                    <FormControl>
                                        <Input  placeholder='Nome' isRequired borderColor={theme=='white' ? 'black':'white'}  {...registerEdited("name")} defaultValue={dataClient?.name} _placeholder={{color:theme==='white' ? 'black':'rgba(255,255,255,0.2)' }} color={theme==='white' ? 'black':'white'}/>
                                    </FormControl>
                                </GridItem>

                                <GridItem>
                                    <FormControl>
                                        <Input placeholder='Empresa' {...registerEdited("company")} borderColor={theme=='white' ? 'black':'white'} defaultValue={dataClient?.company} _placeholder={{color:theme==='white' ? 'black':'rgba(255,255,255,0.2)' }} color={theme==='white' ? 'black':'white'}/>
                                    </FormControl>
                                </GridItem>

                                <GridItem>
                                    <FormControl >
                                        <Input  placeholder='Telefone' {...registerEdited("phone")} borderColor={theme=='white' ? 'black':'white'} defaultValue={dataClient?.phone}  _placeholder={{color:theme==='white' ? 'black':'rgba(255,255,255,0.2)' }} color={theme==='white' ? 'black':'white'}/>
                                    </FormControl>
                                </GridItem>

                                <GridItem>
                                    <FormControl >
                                        <Input placeholder='Email' type={'email'} {...registerEdited("email")} borderColor={theme=='white' ? 'black':'white'} defaultValue={dataClient?.email} isRequired _placeholder={{color:theme==='white' ? 'black':'rgba(255,255,255,0.2)' }} color={theme==='white' ? 'black':'white'}/>
                                    </FormControl>
                                </GridItem>

                                <GridItem colSpan={2}>
                                    <FormControl >
                                        <Input  placeholder='address' {...registerEdited("address")} defaultValue={dataClient?.address} borderColor={theme=='white' ? 'black':'white'} _placeholder={{color:theme==='white' ? 'black':'rgba(255,255,255,0.2)' }} color={theme==='white' ? 'black':'white'}/>
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={1}>
                                    <FormControl >
                                        <Checkbox defaultChecked={checked} onChange={({target})=>setChecked(target.checked)} borderColor={theme=='white' ? 'black':'white'} color={theme=='white' ? 'black':'white'} >
                                            {checked ? 'Activo':'Inativo'}
                                        </Checkbox>
                                    </FormControl>
                                </GridItem>

                                <GridItem colSpan={2} >
                                    <FormControl  >
                                        <Textarea  placeholder='Notas'  {...registerEdited("note")} borderColor={theme=='white' ? 'black':'white'} defaultValue={dataClient?.note} _placeholder={{color:theme==='white' ? 'black':'rgba(255,255,255,0.2)' }} color={theme==='white' ? 'black':'white'}/>
                                    </FormControl>
                                </GridItem>

                                <GridItem colSpan={2} display={'flex'} justifyContent={'center'}>
                                    <Button bgColor='blue' mr={3}  type={'submit'} color={'#fff'} _active={{backgroundColor: ''}} _hover={{transform:'scale(1.1)'}}>
                                        Editar
                                    </Button>
                                    <Button onClick={onClose} bgColor={'red'} color={'#fff'} _active={{backgroundColor: ''}} _hover={{transform:'scale(1.1)'}}>Cancelar</Button>
                                </GridItem>
                            </form>

                        </ModalBody>
                    </ModalContent>
                </Modal>
            </>
    )
}