using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ContactList.Controllers
{
    [Route("api/[controller]")]
    public class ContactController : Controller
    {
        private static List<Contact> PredefinedContacts = new List<Contact>
        {
            new Contact()
            {
                FirstName = "John",
                LastName = "Donald",
                Email = "donald@aol.com",
                Phone = "666-5555-4444",
                Address = "Black Forest 345 Blvd.",
                Gender = Gender.Male
            },
            new Contact()
            {
                FirstName = "Pit",
                LastName = "Jones",
                Email = "jones@aol.com",
                Phone = "666-5555-5555",
                Address = "Atlantic ocean 123 Str.",
                Gender = Gender.Male
            },
            new Contact()
            {
                FirstName = "Dakota",
                LastName = "Johnson",
                Email = "dakota.johnson@yahoo.com",
                Phone = "777-8888-1111",
                Address = "Rocky Mountain 78 Blvd.",
                Gender = Gender.Female
            }
        };

        [HttpGet("[action]")]
        public IEnumerable<Contact> List()
        {
            return PredefinedContacts;
        }

        [HttpGet("[action]/{contactId}")]
        public Contact Detail(int contactId)
        {
            return PredefinedContacts.First(s => s.ID == contactId);
        }

        [HttpPut("[action]")]
        public JsonResult Edit([FromBody]Contact contact)
        {
            try
            {
                var itemIndex = PredefinedContacts.FindIndex(c => c.ID == contact.ID);

                PredefinedContacts[itemIndex] = contact;
            }
            catch (Exception e)
            {
                return new JsonResult(new { status = "error", message = e.Message });
            }

            return new JsonResult(new { status = "success" });
        }

        public class Contact
        {
            private static int AutoIDGenerator = 1;

            public int ID { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Email { get; set; }
            public string Phone { get; set; }
            public string Address { get; set; }
            public Gender Gender { get; set; }

            public Contact()
            {
                this.ID = AutoIDGenerator;

                AutoIDGenerator++;
            }
        }

        public enum Gender
        {
            Female = 1,
            Male = 2
        }
    }
}
