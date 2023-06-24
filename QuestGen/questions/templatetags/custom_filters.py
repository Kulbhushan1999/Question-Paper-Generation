from django import template
import json

register = template.Library()

@register.filter(name='jsonify')
def jsonify(object):
    return json.dumps(object)
