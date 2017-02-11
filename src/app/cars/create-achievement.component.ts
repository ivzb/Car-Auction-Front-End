import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Event, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { AchievementService } from './achievement.service';
import { GroupService } from '../groups/group.service';
import { Achievement } from './achievement';
import { Group } from '../groups/group';
import { NotificationsService } from 'angular2-notifications';

declare var loader: any;
declare var $: any;

@Component({
  templateUrl: './create-achievement.template.html'
})

export class CreateAchievementComponent implements OnInit {
    achievement: Achievement;
    groups: Group[];
    private uplaodedImage: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private achievementService: AchievementService,
        private notificationsService: NotificationsService,
        private groupService: GroupService
    ) {
        
    }

    private publishAchievement(): void {
        this.disableSubmit();
        loader.start();

        let formData = this.getAchievementFormData();
        let isFormValid: boolean = this.validateFormData(formData);

        if (isFormValid) {
            let rawAchievement: Achievement = new Achievement(formData);

            this.achievementService.createAchievement(rawAchievement)
                .then(response => {
                    this.handleSuccess('Achievement (' + response.Title + ')', 'Successfully published');

                    $('#create-achievement-form')[0].reset();
                    this.enableSubmit();
                    loader.done();
                })
                .catch(error => {
                    this.handleError("Could not publish achievement.");
                    this.enableSubmit();
                    loader.done();
                });
        } else {
            this.enableSubmit();
            loader.done();
        }
    }

    private validateFormData(formData: any): boolean {
        let isFormValid: boolean = true;

        for (let field in formData) {
            $('#' + field).removeClass('form-element-error');

            if (formData.hasOwnProperty(field) &&
                ((typeof (formData[field]) == "string" && formData[field] == "") ||
                 (typeof (formData[field]) == "number" && isNaN(formData[field])) ||
                 formData[field] == undefined)
            ) {
                isFormValid = false;
                $('#' + field).addClass('form-element-error');

                let errorMessage = this.formatFieldName(field) + (field.slice(-1) == "s" ? " are" : " is") + " required.";
                this.handleError(errorMessage, "Please enter value.");
            }
        }

        return isFormValid;
    }

    protected formatFieldName(fieldName: string): string {
        let result = '';
        let splitFieldName = fieldName.split(/(?=[A-Z])/);

        splitFieldName.forEach(function (word) {
            let loweredWord = word.toLowerCase();

            if (loweredWord != 'id') {
                result += loweredWord[0].toUpperCase() + loweredWord.slice(1) + ' ';
            }
        })

        return result.trim();
    }

    protected handleSuccess(title: string, description: string) {
        this.notificationsService.success(title, description);
    }

    protected handleError(title: string = "Error occurred.", description: string = "Please try again.") {
        this.notificationsService.error(title, description);
    }

    private disableSubmit(): void {
        $('#submit-achievement').attr('disabled', 'disabled');
    }

    private enableSubmit(): void {
        $('#submit-achievement').removeAttr('disabled');
    }

    public handleFileSelect(event: any, _that: CreateAchievementComponent) {
        var files = event.target.files;

        _that.uplaodedImage = undefined;
        _that.disableSubmit();

        for (var i = 0, file; file = files[i]; i++) {
            var reader = new FileReader();

            reader.onload = function(event: any) {
                _that.uplaodedImage = event.target.result;
                _that.enableSubmit();
            };

            reader.readAsDataURL(file);
        }
    }

    private getAchievementFormData() {
        let formData = {
            title: $("#title").val(),
            description: $("#description").val(),
            wiki: $("#wiki").val(),
            image: this.uplaodedImage,
            thropheyId: $("input[name=throphey]:checked").val(),
            groupId: $("option[name='group']:checked").val()
        };

        return formData;
    }

    public ngOnInit() {
        loader.start();
        this.disableSubmit();
        let _that: CreateAchievementComponent = this;

        document.getElementById('image').addEventListener('change', function(e: any) {
            _that.handleFileSelect(e, _that);
        }, false);

        this.groupService.getGroupsPreview()
            .then(response => {
                _that.groups = response;
                loader.done();
            })
            .catch(error => {
                _that.handleError("Could not fetch groups.");
                loader.done();
            });
    }
}