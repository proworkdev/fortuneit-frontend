import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class LandingPage extends Component {

	render() {

		return (

			<div>
				<div className="banner-section" style={{ backgroundImage: 'url(' + 'images/business.jpg' + ')' }}>
					<div className="container">
						<div className="top-bar">
							<nav className="navbar navbar-expand-lg navbar-light bg-light">
								<a className="navbar-brand" href="/"><img alt="" src="images/main-logo.png" /></a>
								<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
									<span className="navbar-toggler-icon"></span>
								</button>
								<div className="collapse navbar-collapse justify-content-end " id="navbarNavDropdown">
									<ul className="navbar-nav menus">
										<li className="nav-item active">
											<Link to='/' className="nav-link">Home</Link>
										</li>
										<li className="nav-item">
											<Link to='/' className="nav-link">About</Link>
										</li>
										<li className="nav-item">
											<Link to='/showPlans' className="nav-link">Pricing</Link>
										</li>
										<li className="nav-item">
											<Link to='/' className="nav-link">Blog</Link>
										</li>
										<li className="nav-item">
											<Link to='/register' className="nav-link outline-btn">Join</Link>
										</li>
										<li className="nav-item">
											<Link to='/login' className="nav-link fill-btn">Login</Link>
										</li>
									</ul>
								</div>
							</nav>
						</div>

						<div className="banner-content">
							<div className="banner-heading">
								INCREASE <span className="yellow-text">SALES, WIN & RETAIN</span> <span className="smaill-text"> MORE CUSTOMERS NOW!</span>
							</div>
						</div>

					</div>
					<div className="bg-trangle"></div>
				</div>

				<div className="branrds">
					<div className="container">
						<div className="brand-slider">
							<div className="brands-logo owl-carousel owl-theme">
								<div className="item">
									<div className="brand-img">
										<img alt="" src="images/brand-logo.png" />
									</div>
								</div>
								<div className="item">
									<div className="brand-img">
										<img alt="" src="images/brand-logo.png" />
									</div>
								</div>
								<div className="item">
									<div className="brand-img">
										<img alt="" src="images/brand-logo.png" />
									</div>
								</div>
								<div className="item">
									<div className="brand-img">
										<img alt="" src="images/brand-logo.png" />
									</div>
								</div>
								<div className="item">
									<div className="brand-img">
										<img alt="" src="images/brand-logo.png" />
									</div>
								</div>
								<div className="item">
									<div className="brand-img">
										<img alt="" src="images/brand-logo.png" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="what-we-do">
					<div className="container">
						<div className="about-content">
							<div className="left-section">
								<div className="heading-title">
									What We Do
						</div>
								<div className="heading-sub-title">
									No matter where you are in your seller journey, we have leveraged our data and marketplace experience
									to bring you sophisticated and powerful software and creative services to help you optimize
									your sales for Amazon domination.
						</div>
							</div>
							<div className="right-section">
								<div className="view-slider">
									<div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
										<ol className="carousel-indicators">
											<li data-target="#carouselExampleIndicators" data-slide-to="0" ></li>
											<li data-target="#carouselExampleIndicators" data-slide-to="1" className="active"></li>
											<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
										</ol>
										<div className="carousel-inner">
											<div className="carousel-item active">
												<img className="" src="images/atach_dashboard.png" alt="First slide" />
											</div>
											<div className="carousel-item">
												<img className="" src="images/atach_dashboard.png" alt="Second slide" />
											</div>
											<div className="carousel-item">
												<img className="" src="images/atach_dashboard.png" alt="Third slide" />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>


				<div className="services">
					<div className="left-section">
						<img alt="" src="images/services.png" />
					</div>
					<div className="right-section">
						<div className="services-list">
							<div className="services-title">
								Services
					</div>
							<div className="services-tab">
								<div className="services-heading">
									PRODUCT RESEARCH
						</div>
								<div className="services-content">
									If looking to get started as an Amazon Seller, we can assist with product research and market validation for your niche.
									We leverage data points from several tools and resources to provide thorough analysis of opportunities and challenges
									present prior to making substantial investments of time and money.
						</div>
							</div>
							<div className="services-tab">
								<div className="services-heading">
									LISTING OPTIMIZATION
						</div>
								<div className="services-content">
									We help optimize and enhance both new and existing product listings with professional images, and sales copy crafted to
									convert sales and rank for relevant keywords. We also assist with Enhanced Brand Content and Storefront Design for
									Sponsored Brands accepted to the Amazon Brand Registry.
						</div>
							</div>
							<div className="services-tab">
								<div className="services-heading">
									CAMPAIGN MANAGEMENT
						</div>
								<div className="services-content">
									Our organizational strategies, methodology, routine monitoring and reporting analysis will help optimize your PPC campaigns
									by scaling what converts into sales and eliminating what doesn’t bear results. With our Amazon Advertising strategies,
									you can start seeing an increase in sales in a very short time!
						</div>
							</div>
						</div>
					</div>
				</div>

				<div className="testimonial">
					<div className="container">
						<div className="testimonial-box">
							<div className="heading-title">
								Testimonials
					</div>
							<div className="heading-sub-title">
								No matter where you are in your seller journey, <br /> we have leveraged our data and marketplace experience to bring you sophisticated .
					</div>

							<div className="testimonila-slider">
								<div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
									<ol className="carousel-indicators">
										<li data-target="#carouselExampleIndicators" data-slide-to="0" ></li>
										<li data-target="#carouselExampleIndicators" data-slide-to="1" className="active"></li>
										<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
									</ol>
									<div className="carousel-inner">
										<div className="carousel-item active">
											<div className="testimonial-content">
												<div className="user-image">
													<img alt="" src="images/man-poin.png" />
												</div>
												<div className="user-content-box">
													<div className="feedback-box">
														“FortuneIT is my go to launch service for new products on Amazon. I do not hesitate to
														recommend them to customers or others wanting to rank their products fast. If you are
														serious about successfully launching and ranking products, this is the service for you."
											</div>
													<div className="user-name">
														Robin Sharma
											</div>
													<div className="user-post">
														Designer
											</div>
													<div className="user-rating">
														<i className="fa fa-star" aria-hidden="true"></i>
														<i className="fa fa-star" aria-hidden="true"></i>
														<i className="fa fa-star" aria-hidden="true"></i>
														<i className="fa fa-star" aria-hidden="true"></i>
														<i className="fa fa-star" aria-hidden="true"></i>
													</div>
												</div>
											</div>
										</div>
										<div className="carousel-item">
											<div className="testimonial-content">
												<div className="user-image">
													<img alt="" src="images/man-poin.png" />
												</div>
												<div className="user-content-box">
													<div className="feedback-box">
														“FortuneIT is my go to launch service for new products on Amazon. I do not hesitate to
														recommend them to customers or others wanting to rank their products fast. If you are
														serious about successfully launching and ranking products, this is the service for you."
											</div>
													<div className="user-name">
														Robin Sharma
											</div>
													<div className="user-post">
														Designer
											</div>
													<div className="user-rating">
														<i className="fa fa-star" aria-hidden="true"></i>
														<i className="fa fa-star" aria-hidden="true"></i>
														<i className="fa fa-star" aria-hidden="true"></i>
														<i className="fa fa-star" aria-hidden="true"></i>
														<i className="fa fa-star" aria-hidden="true"></i>
													</div>
												</div>
											</div>
										</div>
										<div className="carousel-item">
											<div className="testimonial-content">
												<div className="user-image">
													<img alt="" src="images/man-poin.png" />
												</div>
												<div className="user-content-box">
													<div className="feedback-box">
														“FortuneIT is my go to launch service for new products on Amazon. I do not hesitate to
														recommend them to customers or others wanting to rank their products fast. If you are
														serious about successfully launching and ranking products, this is the service for you."
											</div>
													<div className="user-name">
														Robin Sharma
											</div>
													<div className="user-post">
														Designer
											</div>
													<div className="user-rating">
														<i className="fa fa-star" aria-hidden="true"></i>
														<i className="fa fa-star" aria-hidden="true"></i>
														<i className="fa fa-star" aria-hidden="true"></i>
														<i className="fa fa-star" aria-hidden="true"></i>
														<i className="fa fa-star" aria-hidden="true"></i>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="subscribers">
					<div className="container">
						<div className="subscriber-list">
							<ul>
								<li>
									<div className="subscribe-box">
										<img alt="" src="images/subscribe.png" />
										<div className="bold-text">50 <span>%</span></div>
										<div className="subs-content">
											Amazon Prime Subscribers  of total US Households (2018)
								</div>
									</div>
								</li>
								<li>
									<div className="subscribe-box">
										<img alt="" src="images/online-shop.png" />
										<div className="bold-text">90 <span>Million </span></div>
										<div className="subs-content">
											Amazon Prime Subscribers in the US (2017)
								</div>
									</div>
								</li>
								<li>
									<div className="subscribe-box">
										<img alt="" src="images/team.png" />
										<div className="bold-text">300 <span>Million</span></div>
										<div className="subs-content">
											Amazon Prime Subscribers  of total US Households (2018)
								</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="free-trail">
					<div className="container">
						<div className="trails-section">
							<div className="trails-heading">
								Start your free trial now.
					</div>
							<div className="slogan">
								No credit card required
					</div>
							<div className="trail-btn">
								<a href="/">BUILD YOUR BUSINESS FOR FREE</a>
							</div>
						</div>
					</div>
				</div>

				<div className="footer">
					<div className="container">
						<div className="footer-content">
							<div className="row">
								<div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
									<div className="footer-box">
										<div className="logo-box">
											<img alt="" src="images/white-logo-tiny.png" />
										</div>
										<div className="footer-subtitles">
											42122  PN. Pennsylvania ., <br />
											Track 463 <br />
											Indianapolis, NY 400000  <br />
											United States
								</div>
									</div>
								</div>
								<div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
									<div className="footer-box">
										<div className="footer-title">
											QUICK LINKS
								</div>
										<div className="footer-subtitles">

											<ul>
												<li>
													<Link to='/'>Home</Link>
												</li>

												<li>
													<Link to='/'>Resources</Link>
												</li>

												<li>
													<Link to='/'>About</Link>
												</li>

												<li>
													<Link to='/'>Contact Us</Link>
												</li>

											</ul>

										</div>
									</div>
								</div>
								<div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
									<div className="footer-box">
										<div className="footer-title">
											SERVICES
								</div>
										<div className="footer-subtitles">
											<ul>
												<li>Product Research</li>
												<li>Listing Optimization</li>
												<li>Campaign Managment</li>
												<li>Animated Video Explainers</li>
											</ul>
										</div>
									</div>
								</div>
								<div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
									<div className="footer-box">
										<div className="footer-title">
											SUBSCRIBE FOR UPDATES
								</div>
										<div className="footer-subtitles">
											Subscribe and we'll keep you in the loop
											when we add resources and information
											about our services!
								</div>
										<div className="footer-form">
											<div className="input-form">
												<input type="text" className="form-control" placeholder="Name" />
												<input type="text" className="form-control" placeholder="Email Id" />
												<Link to='/' className="submit">SUBMIT</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="copyright">
							<span>Privacy Policy</span>    <span>Terms & Conditions </span><span>Copyright © 2019 FORTUNEIT LLC. All rights reserved.</span>
						</div>
					</div>
				</div>
			</div>

		)
	}
}

export default LandingPage;