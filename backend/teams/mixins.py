from django.db import models

class CountryMixin(models.Model):
    """Mixin for country code + name with dropdown"""

    COUNTRY_CODES = [
        ('FR', 'France'),
        ('GB', 'England'),
        ('ES', 'Spain'),
        ('DE', 'Germany'),
        ('IT', 'Italy'),
        ('PT', 'Portugal'),
        ('NO', 'Norway'),
        ('TR', 'Turkey'),
        ('NL', 'Netherlands'),
        ('GR', 'Greece'),
        ('', 'Other'),
    ]

    country_code = models.CharField(max_length=2, choices=COUNTRY_CODES, blank=True, verbose_name="Country")
    country_name = models.CharField(max_length=50, blank=True, verbose_name="Country Name")

    class Meta:
        abstract = True  # No DB table created

    def save(self, *args, **kwargs):
        # Autofill name from code
        country_map = dict(self.COUNTRY_CODES)
        self.country_name = country_map.get(self.country_code, '')
        super().save(*args, **kwargs)