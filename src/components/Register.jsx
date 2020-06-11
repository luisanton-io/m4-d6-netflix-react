import React, { Component } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap'
import CreditCardInput from 'react-credit-card-input';

class Register extends Component {

    constructor(props) {
        super(props)
        this.state = this.defaultState
    }

    defaultState = {
        data: {
            name: '',
            surname: '',
            email: '',
            password: '',
            confirmPassword: '',
            yearOfBirth: '',
            streetAddress: '',
            city: '',
            postalCode: '',
            cardNumber: '',
            cardExpiration: '',
            cardCVC: ''
        },
        error: ''
    }

    setDefaultData = () => {
        this.setState({
            data: this.defaultState.data,
            error: this.defaultState.error
        })
    }

    didSubmit = (event) => {
        event.preventDefault()
        console.log('submitting:')
        console.log(this.state.data)
        console.log(this.passwordCheck())
    }

    passwordCheck = () => {
        let response = { 
            ok: true,
            error: []
        }

        if (this.state.data.password !== this.state.data.confirmPassword) {
            response.ok = false
            response.error.push('Passwords don\'t match!')
        } else {
            [
                ['0123456789', 'Password needs at least one number'],
                ['QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm', 'Password needs at least one letter'],
                [`|!"£$%&/()=?^\'[]@<>§°#`, 'Password need at least one special symbol']
            ].forEach( tuple => {
                if (!this.checkSymbol(tuple[0])) {
                    response.ok = false
                    response.error.push(tuple[1])
                } 
            })
        }
        return response
    }

    checkSymbol = (symbols) => {
        for (let symbol of symbols.split('')) {
            if (String(this.state.data.password).includes(symbol)) return true
        }

        return false 
    }

    updateData = (event) => {
        console.log("ID: " + event.currentTarget.id)
        console.log("Value:" + event.currentTarget.value)
        let data = this.state.data

        data[event.currentTarget.id] = event.currentTarget.value

        this.setState({data})
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col className="text-white">
                        <Form onSubmit={this.didSubmit}>
                            <Form.Row>
                                <Col xs={12} md={6}>
                                    <Form.Label className="mt-2">Name</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Your name"
                                        id="name"
                                        onChange={this.updateData}
                                        value={this.state.data.name}
                                        required
                                        />
                                </Col>

                                <Col xs={12} md={6}>
                                    <Form.Label className="mt-2">Surname</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        id="surname"
                                        placeholder="Your surname " 
                                        onChange={this.updateData}
                                        value={this.state.data.surname}
                                        required
                                        />
                                </Col>

                                <Col xs={12}>
                                    <Form.Label className="mt-2">Email address</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        id="email" 
                                        placeholder="Your email" 
                                        onChange={this.updateData}
                                        value={this.state.data.email}
                                        required
                                        />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Col>

                                <Col xs={12} md={6}>
                                    <Form.Label className="mt-2">Password</Form.Label>
                                    <Form.Control 
                                            id="password"
                                            type="password" 
                                            placeholder="Password" 
                                            onChange={this.updateData}
                                            value={this.state.data.password}
                                            />
                                </Col>
                            
                                <Col xs={12} md={6} className="d-flex align-items-end">
                                    <Form.Control 
                                        id="confirmPassword"
                                        type="password" 
                                        placeholder="Confirm password" 
                                        onChange={this.updateData}
                                        value={this.state.data.confirmPassword}
                                        className="mt-2 mt-md-0"
                                        />
                                </Col>

                                <Col xs={12} md={6}>
                                    <Form.Label className="mt-2">Street Address</Form.Label>
                                    <Form.Control 
                                        id="streetAddress"
                                        type="text" 
                                        placeholder="Your address" 
                                        onChange={this.updateData}
                                        value={this.state.data.streetAddress}
                                        />
                                </Col>

                                <Col xs={8} md={4}>
                                    <Form.Label className="mt-2">City</Form.Label>
                                    <Form.Control 
                                        id="city"
                                        type="text" 
                                        placeholder="Your city" 
                                        onChange={this.updateData}
                                        value={this.state.data.city}
                                        />
                                </Col>

                                <Col xs={4} md={2}>
                                    <Form.Label className="mt-2">Postal Code</Form.Label>
                                    <Form.Control 
                                        id="postalCode"
                                        type="text" 
                                        placeholder="Code" 
                                        onChange={this.updateData}
                                        value={this.state.data.postalCode}
                                        />
                                </Col>

                                <Col xs={12}>
                                    <Form.Label className="mt-2">Postal Code</Form.Label>
                                    {/* <Form.Control 
                                        id="creditCard"
                                        type="text" 
                                        placeholder="Code" 
                                        onChange={this.updateData}
                                    /> */}
                                    <div>
                                        <Form.Control as={CreditCardInput}
                                            cardNumberInputProps={{ id:"cardNumber", value: this.state.data.cardNumber, onChange: this.updateData }}
                                            cardExpiryInputProps={{ id:"cardExpiration", value: this.state.data.cardExpiration, onChange: this.updateData }}
                                            cardCVCInputProps={{ id:"cardCVC", value: this.state.data.cardCVC, onChange: this.updateData }}
                                            fieldClassName="input"
                                            />
                                    </div>
                                </Col>
                                
                            </Form.Row>


                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>


                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Register;