import React, {useEffect, useState} from "react";

import {CustomTable} from "../CustomTable";
import {Box, Button, Flex, FormControl, FormLabel, Heading, Image, Input, Text} from "@chakra-ui/react";
import logo from '../assets/img/logo.png'
import {CustomButtonIcon} from "../CustomButtonIcon";
import {
    AiFillFacebook,
    AiFillInstagram,
    AiOutlineBgColors,
    AiOutlineInstagram,
    IoPersonAdd,
    VscColorMode
} from "react-icons/all";
import {useDispatch, useSelector} from "react-redux";
import {IinitialProps} from "../../redux/store";

export const App =()=> {
    const dispatch = useDispatch();
    const [value, setValue] = useState('');
    const [themes, setThemes] = useState('white')

    const onChangeTheme = (theme:string)=>{
        if(themes === 'white'){
           setThemes('black')
        }
        else if(theme === 'black'){
            setThemes('white')
        }
        dispatch({ type: 'set', theme:themes })
        console.log('theme', themes)
    }

  return (
        <Flex flexDir={'column'} bgColor={themes} transition={'background-color 0.5s ease'}>
            <Flex borderBottom={'1px solid #BE152A'} px={'25px'} py={'40px'} align="center" gap={'246px'}>
                <Image src={logo}/>
                <Text fontWeight={'700'} fontSize={'40px'} lineHeight={'54px'} color={themes==='white' ? 'black':'white' }>Frontend Challenge</Text>
            </Flex>
            <Flex p={'70px'} flexDir={'column'} minHeight={'50vh'}>
                <Box display={'flex'} alignItems={'center'} mb={'41px'} gap={'20px'} >
                        <Input
                            placeholder='Pesquisar por nome, empresa , telefone, email ou status'
                            w={{base:'300px', md:'649px'}}
                            h={'50px'}
                            autoComplete={'off'}
                            onChange={({target})=>setValue(target.value)}
                            color={themes==='white' ? 'black':'white' }
                            borderColor={themes==='white' ? 'black':'white' }
                                _placeholder={{color:themes==='white' ? 'black':'white' }}
                        />
                    <Button
                        bgColor={'rgba(190, 21, 42, 1)'}
                        color={'white'}
                        _hover={{backgroundColor: 'rgba(190, 21, 42, 0.8)'}}
                        _active={{backgroundColor: ''}}
                        h={'50px'}
                        onClick={()=>{
                            dispatch({ type: 'set', searchText:value })
                        }}
                    >Search</Button>
                    <CustomButtonIcon Icon={IoPersonAdd} type={'add'}/>
                    <Box bgColor={themes==='white' ? 'black':'white'} color={themes!=='white' ? 'black':'white'} style={{
                            width:'50px',
                            height:'50px',
                            fontSize: '12px',
                            display:'grid',
                            placeItems:'center',
                            borderRadius:'5px',
                            cursor:'pointer'
                        }
                    } onClick={()=>onChangeTheme(themes)}>
                        <VscColorMode  />
                    </Box>

                </Box>
                <CustomTable />
            </Flex>

            <Flex borderTop={'1px solid'.concat(themes!=='white' ? '#CB4455' :'none')} bgColor={themes!=='white' ? 'black':'rgba(0,0,0,0.5)'} py={'36px'} px={'70px'} justify="space-between" color={themes=='white' ? 'black':'white' }>
                <Flex flexDir={'column'} align="center">
                    <Heading size={'md'} >
                        Contacto
                    </Heading>
                    <Flex gap={'26px'}>
                        <Text>
                            (xx) x.xxxx-xxxx
                        </Text>
                        <Text>
                            fulanodetal@teste.com.br
                        </Text>
                    </Flex>
                </Flex>
                <Flex flexDir={'column'} align="center">
                    <Heading size={'md'} >
                        Nossas Redes Sociais
                    </Heading>
                    <Flex gap={'5px'}>
                        <AiFillFacebook fontSize={'30px'}/>
                        <AiOutlineInstagram fontSize={'30px'}/>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
  )
}
