import { businessService } from '../services/businessService';

export async function handleBusinessRegistration(formData: any) {
  try {
    // Transform form data into the correct format
    const transformedData = {
      email: formData.contact.email,
      password: formData.contact.password,
      business_name: formData.contact.business_name,
      contact_phone: formData.contact.contact_phone,
      website: formData.contact.website,
      businessType: formData.businessType,
      
      // Transform locations data
      locations: formData.facilities?.locations?.map((location: any) => ({
        address: location.address,
        city: location.city,
        state: location.state,
        postal_code: location.postal_code,
        amenities: location.amenities,
        operating_hours: location.operating_hours || {}
      })),

      // Transform memberships data
      memberships: formData.memberships?.plans?.map((plan: any) => ({
        name: plan.name,
        price: parseFloat(plan.price),
        benefits: plan.benefits
      })),

      // Additional profile data based on business type
      profile_data: {
        ...formData.qualifications,
        ...formData.services
      }
    };

    const result = await businessService.registerBusiness(transformedData);
    return result;
  } catch (error) {
    console.error('Form submission error:', error);
    throw error;
  }
} 