import Footer from "../../components/Footer"
import { useState } from 'react'
import NavigationBar from "../../components/NavigationBar"

const ContactUs = () => {
	const [isSent, setIsSent] = useState(false)
	const [error, setError] = useState(false)
	const [messageModal, setMessageModal] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	})
	const handleSubmit = (e) => {
		e.preventDefault()
		if (Object.keys(messageModal).some(x => messageModal[x] == '')) {
			setError('All fields are required')
			return
		}
		setIsSent(true)

		 setMessageModal({
			name: '',
			email: '',
			subject: '',
			message: '',
		})
	}
	const handleInputChange = (e) => {
		setIsSent(false)
		setError('')
		setMessageModal({
			...messageModal,
			[e.target.name]:e.target.value
		})
		
	}
	return (
		<> <NavigationBar />
			<section className="ftco-section">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-md-6 text-center mb-5">
							<h2 className="heading-section">Contact Form H! Drive</h2>
						</div>
					</div>
					<div className="row justify-content-center">
						<div className="col-lg-10 col-md-12">
							<div className="wrapper">
								<div className="row no-gutters">
									<div className="col-md-7 d-flex align-items-stretch">
										<div className="contact-wrap w-100 p-md-5 p-4">
											<h3 className="mb-4">Get in touch</h3>
											<div id="form-message-warning" className="mb-4"></div>
											<div id="form-message-success" className="mb-4">
												Your message was sent, thank you!
											</div>
											<form method="POST" id="contactForm" name="contactForm">
												<div className="row">
													<div className="col-md-6 mb-2" >
														<div className="form-group">
															<input value={messageModal.name} onChange={handleInputChange} type="text" className="form-control" name="name" id="name" placeholder="Name" />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<input value={messageModal.email} onChange={handleInputChange} type="email" className="form-control" name="email" id="email" placeholder="Email" />
														</div>
													</div>
													<div className="col-md-12 mb-2">
														<div className="form-group">
															<input value={messageModal.subject} onChange={handleInputChange} type="text" className="form-control" name="subject" id="subject" placeholder="Subject" />
														</div>
													</div>
													<div className="col-md-12 mb-2">
														<div className="form-group">
															<textarea value={messageModal.message} onChange={handleInputChange} name="message" className="form-control" id="message" cols="30" rows="7" placeholder="Message"></textarea>
														</div>
													</div>
													{isSent && (
														<div className="alert alert-success mb-2">
															<span>Message sent</span>
														</div>
													)}
													{error && (
														<div className="alert alert-danger mb-2">
															<span>All fields are required</span>
														</div>
													)}
													<div className="col-md-12">
														<div className="form-group">
															<input type="submit" value="Send Message" className="btn btn-primary" onClick={handleSubmit} />
															<div className="submitting"></div>
														</div>
													</div>
												</div>
											</form>
										</div>
									</div>
									<div className="col-md-5 d-flex align-items-stretch">
										<div className="info-wrap bg-primary w-100 p-lg-5 p-4">
											<h3 className="mb-4 mt-md-4">Contact us</h3>
											<div className="dbox w-100 d-flex align-items-start">
												{/* <div className="icon d-flex align-items-center justify-content-center">
				        			<span className="fa fa-map-marker"></span>
				        		</div> */}
												<div className="text pl-3">
													<p><span>Address:</span> KIET Group of institurions, Ghaziabad</p>
												</div>
											</div>
											<div className="dbox w-100 d-flex align-items-center">
												{/* <div className="icon d-flex align-items-center justify-content-center">
				        			<span className="fa fa-phone"></span>
				        		</div> */}
												<div className="text pl-3">
													<p><span>Phone:</span> <a href="tel://1234567920">+918853564158</a></p>
												</div>
											</div>
											<div className="dbox w-100 d-flex align-items-center">
												{/* <div className="icon d-flex align-items-center justify-content-center">
				        			<span className="fa fa-paper-plane"></span>
				        		</div> */}
												<div className="text pl-3">
													<p><span>Email:</span> <a href="mailto:info@yoursite.com">hidrive@gmail.com</a></p>
												</div>
											</div>
											<div className="dbox w-100 d-flex align-items-center">
												{/* <div className="icon d-flex align-items-center justify-content-center">
				        			<span className="fa fa-globe"></span>
				        		</div> */}
												<div className="text pl-3">
													<p><span>Website</span> <a href="#">hidrive.com</a></p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<Footer /></>

	)
}

export default ContactUs